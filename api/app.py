from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
import rasterio

app = Flask(__name__, static_url_path='', static_folder='ui/build/static')
CORS(app)

@app.route("/")
def home():
    return send_from_directory(app.static_folder,'index.html')

@app.route("/getDNI/<lng>/<lat>")
def getDNI(lng,lat):
  file = r'nsrdb3_dni.tif'

  with rasterio.open(file) as src:
    for val in src.sample([(float(lng),float(lat))]):
      res = jsonify(dni=val[0])
      res.headers.add("Access-Control-Allow-Origin", "*")
      return res

if __name__ == "__main__":
  app.run(debug=True,host="0.0.0.0", port=5001)