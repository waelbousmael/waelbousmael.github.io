#!/usr/bin/env python3
"""Resize + recompress an image for the WB Studio site (requires Pillow).

Usage:
    python scripts/optimize-image.py INPUT OUTPUT [--width 1600] [--ratio 1.6] [--quality 80]

- Scales the image down to --width (never upscales).
- With --ratio, center-crops to that aspect ratio first (e.g. 1.6 for covers).
- Output format follows the OUTPUT extension (.webp recommended).
Prints the final "WIDTH HEIGHT SIZE_KB" so you can copy w/h into data/projects.json.
"""
import argparse
import os
import sys

from PIL import Image


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('input')
    ap.add_argument('output')
    ap.add_argument('--width', type=int, default=1600)
    ap.add_argument('--ratio', type=float, default=None, help='target aspect ratio w/h, center-crop')
    ap.add_argument('--quality', type=int, default=80)
    args = ap.parse_args()

    im = Image.open(args.input)
    if im.mode not in ('RGB', 'L'):
        im = im.convert('RGB')

    if args.ratio:
        w, h = im.size
        current = w / h
        if current > args.ratio:          # too wide → trim sides
            new_w = round(h * args.ratio)
            x = (w - new_w) // 2
            im = im.crop((x, 0, x + new_w, h))
        elif current < args.ratio:        # too tall → trim top/bottom
            new_h = round(w / args.ratio)
            y = (h - new_h) // 2
            im = im.crop((0, y, w, y + new_h))

    if im.width > args.width:
        im = im.resize((args.width, round(im.height * args.width / im.width)), Image.LANCZOS)

    save_kwargs = {'quality': args.quality}
    if args.output.lower().endswith('.webp'):
        save_kwargs['method'] = 6
    im.save(args.output, **save_kwargs)

    kb = os.path.getsize(args.output) // 1024
    print(f'{im.width} {im.height} {kb}KB')


if __name__ == '__main__':
    sys.exit(main())
