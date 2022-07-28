import VectorImageLayer from 'ol/layer/VectorImage';
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import {Fill, Stroke, Style} from 'ol/style';
//Initializing the clusters 
const areaLayer = new VectorImageLayer({
    imageRatio: 4,
    source: new VectorSource({
      url: "https://storage.googleapis.com/ot-test-data/recruiting_challenge_frontend.geojson",
      format: new GeoJSON(),
    }),
    visible: true,
    style: function(feature){
      let color = '#45B1E8'
      if(feature.getProperties().confidence >= 1){
        color = 'red'
      }
      return new Style({
        stroke: new Stroke({color:color}),
        fill: new Fill({color:"transparent"})
      })
    }
});
export {areaLayer}