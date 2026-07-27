# Genera il logo del navbar alle densita esatte (1x/2x/3x, altezza CSS 54px)
# con maschera di contrasto dopo il ridimensionamento: niente riscalatura nel browser.
from PIL import Image, ImageFilter

src = Image.open('public/logo.png').convert('RGBA')
BASE_H = 54
for k in (1, 2, 3):
    h = BASE_H * k
    w = round(src.width * h / src.height)
    out = src.resize((w, h), Image.LANCZOS)
    out = out.filter(ImageFilter.UnsharpMask(radius=1.1, percent=85, threshold=2))
    name = f'public/logo-nav{"" if k == 1 else f"@{k}x"}.png'
    out.save(name, optimize=True)
    print(name, out.size)
