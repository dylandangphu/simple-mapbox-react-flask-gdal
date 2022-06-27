import logo from './logo.svg';
import './App.css';
import React from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapViz from './components/MapViz';

export default function App() {
  
  mapboxgl.accessToken = 'pk.eyJ1IjoiZHlsYW5kYW5ncGh1IiwiYSI6ImNsNHU5cnQ4czBmMzQzZXQwZHY4Y3p3MmQifQ.i3-S5_S9XPmsG5dAR2JcOg';

  return (
    <div className="App">
      <MapViz></MapViz>
    </div>
  );
}