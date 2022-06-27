import rasterio
from rasterio.plot import show

fp = r'nsrdb3_dni.tif'
img = rasterio.open(fp)

with rasterio.open(fp) as src:
  x = (src.bounds.left + src.bounds.right) / 2.0
  y = (src.bounds.bottom + src.bounds.top) / 2.0

  print(x,y)

  for val in src.sample([(x, y)]): 
    print(val)

  show(img)
