# Estrae gli URL delle IMMAGINI da un post carosello di Instagram
# (yt-dlp scarica solo video: qui leggiamo i metadati e prendiamo le foto).
import json
import sys
import urllib.request

from yt_dlp import YoutubeDL

url = sys.argv[1]
outdir = sys.argv[2]

with YoutubeDL({'quiet': True, 'skip_download': True, 'ignoreerrors': True}) as ydl:
    info = ydl.extract_info(url, download=False)

entries = info.get('entries') or [info]
print(f'elementi nel post: {len(entries)}')

count = 0
for i, e in enumerate(entries, 1):
    if not e:
        print(f'{i:02d}: (nessun metadato)')
        continue
    thumbs = e.get('thumbnails') or []
    if not thumbs:
        print(f'{i:02d}: nessuna immagine')
        continue
    # la miniatura più grande = immagine originale
    best = max(thumbs, key=lambda t: (t.get('width') or 0) * (t.get('height') or 0))
    dest = f'{outdir}/ig-{i:02d}.jpg'
    req = urllib.request.Request(best['url'], headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as r, open(dest, 'wb') as f:
        f.write(r.read())
    print(f'{i:02d}: {best.get("width")}x{best.get("height")} -> {dest}')
    count += 1

print(f'scaricate {count} immagini')
