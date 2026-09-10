#!/usr/bin/env python3
"""Normalize published WebP files and prepare responsive sizes; requires Pillow.

Run after adding/replacing media, then update any reported data dimensions and
run node scripts/build.mjs. Existing images within budget are not re-encoded.
Only images referenced by site/project data are processed; icons are untouched.
"""
import hashlib
from io import BytesIO
import json
from pathlib import Path
import re
import subprocess

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / 'data/image-variants.json'


def image_refs(value):
    if isinstance(value, dict):
        if isinstance(value.get('src'), str) and value['src'].startswith('/') and 'w' in value:
            yield value
        for child in value.values():
            yield from image_refs(child)
    elif isinstance(value, list):
        for child in value:
            yield from image_refs(child)


def encode(image, limit):
    """Use the highest tested quality that meets the byte budget."""
    for quality in range(90, 49, -5):
        buffer = BytesIO()
        image.save(buffer, format='WEBP', quality=quality, method=6)
        if buffer.tell() <= limit:
            return buffer.getvalue()
    raise ValueError(f'Image cannot meet {limit} bytes without reducing quality below 50; resize the source first')


def main():
    site = json.loads(subprocess.check_output([
        'node', '--input-type=module', '-e',
        "import site from './data/site.mjs'; console.log(JSON.stringify(site));"
    ], cwd=ROOT, encoding='utf-8'))
    project_file = ROOT / 'data/projects.json'
    project_text = project_file.read_text(encoding='utf-8')
    projects = json.loads(project_text)
    site_media = [site['home']['heroImage'], site['about']['portrait'], [landing['image'] for landing in site['landings']]]
    refs = list(image_refs([site_media, projects]))
    previous = json.loads(MANIFEST.read_text(encoding='utf-8')) if MANIFEST.exists() else {}
    manifest = {}
    before = after = 0
    for src in sorted({ref['src'] for ref in refs}):
        file = ROOT / src.lstrip('/')
        original_bytes = file.read_bytes()
        before += len(original_bytes)
        with Image.open(file) as opened:
            original_format = opened.format
            image = opened.convert('RGBA' if 'A' in opened.getbands() else 'RGB')
        limit = (350 if file.stem == 'cover' else 300) * 1024
        if file.suffix == '.webp' and (original_format != 'WEBP' or len(original_bytes) > limit):
            file.write_bytes(encode(image, limit))
            # Derive responsive copies from the committed source, so a clean
            # regeneration yields the same files as the initial preparation.
            with Image.open(file) as normalized:
                image = normalized.convert('RGBA' if 'A' in normalized.getbands() else 'RGB')
        current_bytes = file.read_bytes()
        after += len(current_bytes)
        digest = hashlib.sha256(current_bytes).hexdigest()
        entry = {'w': image.width, 'h': image.height, 'sha256': digest, 'variants': []}
        for width in (640, 960):
            if width >= image.width:
                continue
            variant_file = file.with_name(f'{file.stem}-{width}w.webp')
            variant_src = '/' + variant_file.relative_to(ROOT).as_posix()
            if previous.get(src, {}).get('sha256') != digest or not variant_file.exists():
                resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
                variant_file.write_bytes(encode(resized, (150 if width == 640 else 220) * 1024))
            entry['variants'].append({'src': variant_src, 'w': width})
        manifest[src] = entry
    # Preserve the hand-maintained JSON formatting while correcting dimensions.
    def dimensions(match):
        media = manifest[match[2]]
        return f'{match[1]}{media["w"]}{match[4]}{media["h"]}'
    project_text = re.sub(r'("src":\s*"([^"]+)",\s*"w":\s*)(\d+)(,\s*"h":\s*)(\d+)', dimensions, project_text)
    project_file.write_text(project_text, encoding='utf-8')
    MANIFEST.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    for ref in image_refs(site_media):
        entry = manifest[ref['src']]
        if (ref['w'], ref['h']) != (entry['w'], entry['h']):
            print(f"Update data/site.mjs: {ref['src']} -> {entry['w']} x {entry['h']}")
    print(f'{len(manifest)} images prepared; original bytes {before:,} -> {after:,}; variants {sum(len(e["variants"]) for e in manifest.values())}')


if __name__ == '__main__':
    main()
