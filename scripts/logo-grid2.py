# Griglia sull'immagine pulita (solo sfondo rimosso) in COORDINATE ORIGINALI,
# per definire il poligono del fulmine.
import sys
from collections import deque
from PIL import Image, ImageDraw

im = Image.open('public/fittoirlogo.png').convert('RGBA')
W, H = im.size
px = im.load()
is_bg = lambda p: max(p[0], p[1], p[2]) < 60 and p[3] > 0
seen = set(); q = deque()
for s in [(x,0) for x in range(0,W,6)] + [(x,H-1) for x in range(0,W,6)] \
       + [(0,y) for y in range(0,H,6)] + [(W-1,y) for y in range(0,H,6)]:
    if is_bg(px[s]) and s not in seen:
        seen.add(s); q.append(s)
while q:
    x, y = q.popleft()
    px[x, y] = (30, 30, 34, 255)  # sfondo grigio scuro per distinguerlo dal nero interno
    for nx, ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
        if 0 <= nx < W and 0 <= ny < H and (nx,ny) not in seen and is_bg(px[nx,ny]):
            seen.add((nx,ny)); q.append((nx,ny))

d = ImageDraw.Draw(im)
for x in range(0, W, 50):
    d.line([(x,0),(x,H)], fill=(0,255,0,140), width=1)
    d.text((x+2, 2), str(x), fill=(0,255,0,255))
for y in range(0, H, 50):
    d.line([(0,y),(W,y)], fill=(0,255,0,140), width=1)
    d.text((2, y+2), str(y), fill=(0,255,0,255))
im.convert('RGB').save(sys.argv[1])
print('saved')
