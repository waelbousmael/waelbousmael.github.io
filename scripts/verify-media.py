#!/usr/bin/env python3
"""Check published image bytes, dimensions and responsive derivatives (Pillow)."""
import hashlib
import json
from pathlib import Path
import subprocess
import unittest

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DATA = json.loads(subprocess.check_output([
    'node', '--input-type=module', '-e',
    "import site from './data/site.mjs'; import fs from 'node:fs'; "
    "console.log(JSON.stringify([site, JSON.parse(fs.readFileSync('data/projects.json', 'utf8'))]));"
], cwd=ROOT, encoding='utf-8'))
DATA = [DATA[0]['home']['heroImage'], DATA[0]['about']['portrait'],
        [landing['image'] for landing in DATA[0]['landings']], DATA[1]]


def image_refs(value):
    if isinstance(value, dict):
        if isinstance(value.get('src'), str) and value['src'].startswith('/') and 'w' in value:
            yield value
        for child in value.values():
            yield from image_refs(child)
    elif isinstance(value, list):
        for child in value:
            yield from image_refs(child)


class PublishedMediaTests(unittest.TestCase):
    def test_original_formats_sizes_and_dimensions(self):
        for ref in image_refs(DATA):
            with self.subTest(src=ref['src']):
                file = ROOT / ref['src'].lstrip('/')
                with Image.open(file) as image:
                    if file.suffix == '.webp':
                        self.assertEqual(image.format, 'WEBP', f'{file.name}: extension must match encoded format')
                    self.assertEqual(image.size, (ref['w'], ref['h']), f'{ref["src"]}: stale dimensions')
                if '/assets/projects/' in ref['src']:
                    limit = (350 if file.stem == 'cover' else 300) * 1024
                    self.assertLessEqual(file.stat().st_size, limit, 'Project image exceeds byte budget')

    def test_responsive_manifest(self):
        file = ROOT / 'data/image-variants.json'
        self.assertTrue(file.exists(), 'Responsive image manifest is missing')
        manifest = json.loads(file.read_text(encoding='utf-8'))
        for src in sorted({ref['src'] for ref in image_refs(DATA)}):
            with self.subTest(src=src):
                entry = manifest[src]
                original = ROOT / src.lstrip('/')
                self.assertEqual(entry['sha256'], hashlib.sha256(original.read_bytes()).hexdigest())
                with Image.open(original) as image:
                    width, height = image.size
                self.assertEqual((entry['w'], entry['h']), (width, height))
                self.assertEqual([v['w'] for v in entry['variants']], [w for w in (640, 960) if w < width])
                for variant in entry['variants']:
                    variant_file = ROOT / variant['src'].lstrip('/')
                    with Image.open(variant_file) as image:
                        self.assertEqual(image.format, 'WEBP')
                        self.assertEqual(image.size, (variant['w'], round(height * variant['w'] / width)))
                    self.assertLessEqual(variant_file.stat().st_size, (150 if variant['w'] == 640 else 220) * 1024)


if __name__ == '__main__':
    unittest.main()
