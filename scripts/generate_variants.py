#!/usr/bin/env python3
import os
from io import BytesIO
try:
    from PIL import Image
except Exception:
    print('Pillow not installed. Run: pip install pillow')
    raise

ROOT = os.getcwd()
IMG_DIR = os.path.join(ROOT, 'images')
UPLOADS = os.path.join(IMG_DIR, 'uploads')

SIZES = [480, 768, 1200, 1920]


def process_file(path):
    name = os.path.basename(path)
    base, ext = os.path.splitext(name)
    try:
        img = Image.open(path).convert('RGB')
    except Exception as e:
        print('Skipping', path, '->', e)
        return

    for w in SIZES:
        ratio = w / img.width
        h = int(img.height * ratio)
        resized = img.resize((w, h), Image.LANCZOS)
        out_jpg = os.path.join(os.path.dirname(path), f"{base}-{w}.jpg")
        out_webp = os.path.join(os.path.dirname(path), f"{base}-{w}.webp")
        resized.save(out_jpg, format='JPEG', quality=85)
        resized.save(out_webp, format='WEBP', quality=80)
        print('Saved', out_jpg, out_webp)

    thumb = img.copy()
    thumb.thumbnail((300, 300))
    out_thumb = os.path.join(os.path.dirname(path), f"{base}-thumb.jpg")
    thumb.save(out_thumb, format='JPEG', quality=80)
    print('Saved thumbnail', out_thumb)


if __name__ == '__main__':
    targets = [
        os.path.join(IMG_DIR, 'mainscreen.png'),
        os.path.join(IMG_DIR, 'logo.png')
    ]
    if os.path.isdir(UPLOADS):
        for f in os.listdir(UPLOADS):
            targets.append(os.path.join(UPLOADS, f))

    for t in targets:
        if os.path.exists(t):
            process_file(t)
        else:
            print('Not found, skipping', t)
