# Ispeziona la zona del fulmine per trovare la regione nera da riempire di bianco.
# Salva un crop ingrandito con una griglia di coordinate.
import sys
from PIL import Image, ImageDraw

im = Image.open('public/fittoirlogo.png').convert('RGBA')
# crop centrale attorno al fulmine
box = (380, 150, 820, 901)  # left, top, right, bottom
crop = im.crop(box)
crop = crop.resize((crop.width, crop.height))
d = ImageDraw.Draw(crop)
step = 50
for x in range(0, crop.width, step):
    d.line([(x, 0), (x, crop.height)], fill=(0, 255, 0, 120), width=1)
    d.text((x + 2, 2), str(x + box[0]), fill=(0, 255, 0, 255))
for y in range(0, crop.height, step):
    d.line([(0, y), (crop.width, y)], fill=(0, 255, 0, 120), width=1)
    d.text((2, y + 2), str(y + box[1]), fill=(0, 255, 0, 255))
out = sys.argv[1]
crop.save(out)
print('saved', out, crop.size)
