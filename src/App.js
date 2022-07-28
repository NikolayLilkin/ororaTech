import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import Overlay from 'ol/Overlay';
import './App.css';
import {defaults as defaultControls} from 'ol/control';
import {Menu} from './Menu.js';
import {areaLayer} from './areaLayer.js';
import {Graphs} from './Graphs.js';

function App() {
    const [map, setMap] = useState();
    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;
    //fetching the data for the widget button which shows the average hotspot count
    fetch("https://storage.googleapis.com/ot-test-data/recruiting_challenge_frontend.geojson").then(response =>{
      return response.json();
    }).then(data => {
      let arr = data.features;
      let numFire = 0;
      for(let i = 0; i < arr.length;i++){
        numFire = numFire + arr[i].properties.num_fires 
      }
      const result = numFire / arr.length
      const element = document.getElementById("averageHotstop");
      element.innerHTML =  `<p>Average hotspot: ${result}</p>`
    }).catch(error => {
      console.log(error);
    });
    useEffect(() => {
        const container = document.getElementById('popup');
        const content = document.getElementById('popup-content');
        const closer = document.getElementById('popup-closer');
        const overlay = new Overlay({
          element: container,
          autoPan: {
            animation: {
            duration: 250,
            },
          },
        });
        //Extended the defaultControls with new menu
        const initialMap = new Map({
          controls: defaultControls().extend([new Menu()]),
          target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                areaLayer
            ],
            overlays:[overlay],
            view: new View({
                center: [0, 0],
                zoom: 0,
            }),
        });
        //Closer function for the popup
        closer.onclick = function () {
          overlay.setPosition(undefined);
          closer.blur();
          return false;
        };
        //Making the popup clickable
        initialMap.on('click', function (evt) {
          overlay.setPosition(undefined);
          initialMap.forEachFeatureAtPixel(evt.pixel, function(feature){
            const coordinate = evt.coordinate;
            content.innerHTML =             
            '<p>Id: ' + feature.getProperties().id +'</p>' +
            '<p>Age: ' + feature.getProperties().age +'</p>' +
            '<p>Confidence: ' + feature.getProperties().confidence +'</p>' + 
            '<p>num_fires: ' + feature.getProperties().num_fires + '</p>'
            overlay.setPosition(coordinate);
          })
        });
        setMap(initialMap);
    }, []);
    return (
      <div>
      <div ref={mapElement} className="map"/>
      <div id="popup" className="ol-popup">
        <button id="popup-closer" className="ol-popup-closer"></button>
        <div id="popup-content"></div>
      </div>
      <div id="diagram" className="ol-popup diagram" style= {{visibility: 'hidden'}}>
        <button id="diagram-closer" className="ol-popup-closer"></button>
        <div>
          <Graphs/>
        </div>
      </div>
      <div id="widget" className="ol-popup widget" style= {{visibility: 'hidden'}}>
        <button id="widget-closer" className="ol-popup-closer"></button>
        <div>
          <p id="averageHotstop"></p>
        </div>
      </div>
      </div>
    );
}
export default App;