# Pulisce il logo del cliente (parte SEMPRE dall'originale fittoirlogo.png):
#  1) sfondo nero esterno -> trasparente
#  2) fulmine: per ogni riga, dal bianco si SALTA la linea oro divisoria sottile,
#     si imbianca la fascia nera e ci si ferma al SECONDO oro (bordo vero del fulmine).
#     Il nero tra fulmine e braccio resta nero, il bordo oro resta intatto.
#  3) crop + export: logo.png + logo-nav.png (navbar 120px)
from collections import deque
from PIL import Image

im = Image.open('public/fittoirlogo.png').convert('RGBA')
W, H = im.size
px = im.load()

# ---- 1) sfondo -> trasparente ----
is_bg = lambda p: max(p[0], p[1], p[2]) < 60 and p[3] > 0
seen = set(); q = deque()
for s in [(x,0) for x in range(0,W,6)] + [(x,H-1) for x in range(0,W,6)] \
       + [(0,y) for y in range(0,H,6)] + [(W-1,y) for y in range(0,H,6)]:
    if is_bg(px[s]) and s not in seen:
        seen.add(s); q.append(s)
n_bg = 0
while q:
    x, y = q.popleft()
    px[x, y] = (0, 0, 0, 0); n_bg += 1
    for nx, ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
        if 0 <= nx < W and 0 <= ny < H and (nx,ny) not in seen and is_bg(px[nx,ny]):
            seen.add((nx,ny)); q.append((nx,ny))
print('sfondo:', n_bg, 'px -> trasparente')

# ---- 2) componente bianco del fulmine ----
is_white = lambda p: min(p[0], p[1], p[2]) > 200 and p[3] > 0
is_gold = lambda p: p[3] > 0 and p[0] > 140 and (p[0] - p[2]) > 60

wseed = (650, 300)
assert is_white(px[wseed])
wset = {wseed}; q = deque([wseed]); row_max = {}
while q:
    x, y = q.popleft()
    if y not in row_max or x > row_max[y]: row_max[y] = x
    for nx, ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
        if 0 <= nx < W and 0 <= ny < H and (nx,ny) not in wset and is_white(px[nx,ny]):
            wset.add((nx,ny)); q.append((nx,ny))
print('bianco:', len(wset), 'px | righe:', len(row_max))

# ---- passo A: righe "sicure" -> posizione del bordo oro destro del fulmine ----
MAX_SCAN = 300
MAX_DIVIDER = 24
MIN_EDGE = 6
edges = {}
for y, xw in sorted(row_max.items()):
    x = xw + 1
    limit = min(xw + MAX_SCAN, W)
    while x < limit and not is_gold(px[x, y]) and not is_white(px[x, y]) and x - xw < 8:
        x += 1
    g1s = x
    while x < limit and is_gold(px[x, y]):
        x += 1
    if not (0 < x - g1s <= MAX_DIVIDER):
        continue
    d1s = x
    while x < limit and not is_gold(px[x, y]) and not is_white(px[x, y]) and px[x, y][3] > 0:
        x += 1
    if not (3 <= x - d1s <= 130) or x >= limit or not is_gold(px[x, y]):
        continue  # fascia troppo larga = ha saltato il bordo e visto l'oro del braccio
    g2s = x
    while x < limit and is_gold(px[x, y]):
        x += 1
    if x - g2s >= MIN_EDGE:
        edges[y] = g2s
print('righe di controllo del bordo (grezze):', len(edges))

# filtro mediano: butta le righe il cui bordo salta lontano dai vicini
import statistics
ys_raw = sorted(edges)
good = {}
for y in ys_raw:
    neigh = [edges[v] for v in ys_raw if abs(v - y) <= 25]
    if len(neigh) < 3 or abs(edges[y] - statistics.median(neigh)) <= 35:
        good[y] = edges[y]
edges = good
print('righe di controllo del bordo (filtrate):', len(edges))

# ---- passo B: interpola il bordo e riempi in modo uniforme ----
ys = sorted(edges)
y0, y1 = ys[0], ys[-1]
def edge_at(y):
    lo = max((v for v in ys if v <= y), default=None)
    hi = min((v for v in ys if v >= y), default=None)
    if lo is None: return edges[hi]
    if hi is None: return edges[lo]
    if lo == hi: return edges[lo]
    t = (y - lo) / (hi - lo)
    return round(edges[lo] + t * (edges[hi] - edges[lo]))

filled = 0
for y in range(y0, y1 + 1):
    if y not in row_max:
        continue
    stop = edge_at(y)
    for fx in range(row_max[y] + 1, stop):
        p = px[fx, y]
        if p[3] > 0 and not is_white(p):
            px[fx, y] = (255, 255, 255, 255)
            filled += 1
print(f'fulmine: {filled} px -> bianco (righe {y0}-{y1})')

# ---- 3) crop + export ----
bbox = im.getbbox(); m = 6
im = im.crop((max(0,bbox[0]-m), max(0,bbox[1]-m), min(W,bbox[2]+m), min(H,bbox[3]+m)))
im.save('public/logo.png')
print('logo.png', im.size)
nav = im.resize((round(im.width * 120 / im.height), 120), Image.LANCZOS)
nav.save('public/logo-nav.png')
print('logo-nav.png', nav.size)
