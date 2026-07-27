# Visualizza il componente scuro connesso al seed del fulmine (magenta)
# per capire DOVE si collega allo sfondo esterno.
import sys
from collections import deque
from PIL import Image

im = Image.open('public/fittoirlogo.png').convert('RGBA')
W, H = im.size
px = im.load()

is_dark = lambda p: max(p[0], p[1], p[2]) < 85

seed = (650, 300)
seen = {seed}
q = deque([seed])
touches_border = False
comp = []
while q:
    x, y = q.popleft()
    comp.append((x, y))
    if x in (0, W-1) or y in (0, H-1):
        touches_border = True
    for nx, ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
        if 0 <= nx < W and 0 <= ny < H and (nx,ny) not in seen and is_dark(px[nx,ny]):
            seen.add((nx,ny)); q.append((nx,ny))

print('component size:', len(comp), '| touches border:', touches_border)

overlay = im.copy()
opx = overlay.load()
for (x, y) in comp:
    opx[x, y] = (255, 0, 255, 255)
overlay.save(sys.argv[1])
print('overlay saved')
