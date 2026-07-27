# Ridimensiona e comprime una foto per il web.
# uso: python scripts/optimize-photo.py <sorgente> <destinazione> [larghezza]
import os
import sys

from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
width = int(sys.argv[3]) if len(sys.argv) > 3 else 1100

im = Image.open(src).convert('RGB')
height = round(im.height * width / im.width)
im = im.resize((width, height), Image.LANCZOS)
im.save(dst, 'JPEG', quality=82, optimize=True, progressive=True)
print(f'{dst} — {width}x{height} — {round(os.path.getsize(dst) / 1024)} KB')
