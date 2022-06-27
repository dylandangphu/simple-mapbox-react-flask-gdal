import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
var Rainbow = require('rainbowvis.js');


const MapViz = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-98.35);
  const [lat, setLat] = useState(39.5);
  const [zoom, setZoom] = useState(1);
  const [currentColor, setCurrentColor] = useState('#74ADD1');
  const [currentDNI, setCurrentDNI] = useState(0);
  const rb = new Rainbow();
  
  const bounds = [[-135, 20],[-60,50]];
  const layers = {
    '2': '#74ADD1',
    '3': '#ABD9E9',
    '4': '#E0F3F8',
    '5': '#FFF490',
    '6': '#FDAE61',
    '7': '#FD6D43',
    '8': '#D73027',
  }

  rb.setNumberRange(2,8);
  rb.setSpectrum(...Object.values(layers));

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      // minZoom: zoom,
      maxPitch: 0,
      dragRotate: false,
      center: [lng,lat],
      maxBounds: bounds,
      attributionControl: false
    });
    map.current.on('load', () => {
      map.current.addLayer({
          id: 'dylandangphu.6sk8el1z',
          type: 'raster',
          source: {
              type: 'raster',
              url: 'mapbox://dylandangphu.6sk8el1z'
          },
          paint: {
            'raster-opacity': 0.4,
          }
      });
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('mousemove', async (e) => {
      const res = await getDNI(e.lngLat.lng,e.lngLat.lat);
      setCurrentDNI(res.dni.toFixed(2));
      const dniColor = rb.colorAt(res.dni);
      setCurrentColor(`#${dniColor}`);
    });
  }, []);

  const getDNI = async (lng, lat) => {

    const res = await fetch(`http://127.0.0.1:5001/getDNI/${lng}/${lat}`)
      .then(res => {if (res.ok) return res.json()})
      .catch(err => console.log(err))

      return res
  }
  
  return (
    <div>
      <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="legend">
        <table>
          <tbody>
            <tr>
            Direct Normal Solar Irradiance - kWh/m^2/Day
            </tr>
            <tr>
            {Object.keys(layers).map((key) => {
              return <span key={layers[key]} className='legend-box' style={{backgroundColor:layers[key]}}></span>})}
            </tr>
            <tr>
            {Object.keys(layers).map((key) => { 
              return <span key={key} className='legend-keys'>{key}</span> })}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="dni">
        <div className='dni-box' style={{backgroundColor:currentColor}}></div>
        <div className='dni-val'>{currentDNI} kWh/m^2/Day</div>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default MapViz;