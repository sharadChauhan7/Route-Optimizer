import React, { useState ,useEffect} from "react";
// import ReactMapGL, { Marker, Popup,Source,Layer } from "react-map-gl";
import Map,{ Marker, Popup,Source,Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
// import MapSidebar from "./MapSidebar";
import FunctionBox from "./FunctionBox"; 
import MapMarker from "./MapMarker";
import {optimizeDeliveryPath} from "../util/main";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import RoomIcon from '@mui/icons-material/Room';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  let citiesData = [{}];
  let [markedPlace, setMarkedPlace] = useState([]);
  let [pointA, setPointA] = useState([77.6737,27.4924]);
  let [pointB, setPointB] = useState([77.6737,27.4924]);
  const [route, setRoute] = useState(null);

  function handleMarkerClick(evt) {
        const { lng, lat } = evt.lngLat; 
        setMarkedPlace((prev)=>[...prev,{lat:lat,lng:lng}]);
  }

  const [viewPort, setViewPort] = useState({
    latitude: 27.4955539,
    longitude: 77.6855554,
    zoom: 13,
    bearing: 0,  // Ensure bearing is set
      pitch: 0,
  });
  useEffect(() => {
    const fetchRoute = async () => {
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pointA[0]}%2C${pointA[1]}%3B${pointB[0]}%2C${pointB[1]}?alternatives=false&continue_straight=false&geometries=geojson&overview=simplified&steps=false&access_token=pk.eyJ1Ijoic2hhcmFkc2luZ2hjaGEtY3MyMiIsImEiOiJjbHI4cXlseGsyZ3VpMmtwbmpwamE1bDNwIn0.s2xcZq-7mZ71CNpimlNP_A`)
    const data = await response.json();
      if (data.routes.length > 0) {
        setRoute(data.routes[0].geometry);
      }
      
    };
    setViewPort((prev) => ({
      ...prev,
      longitude: pointB[0],
      latitude: pointB[1],
      transitionDuration: 500,
    }));

    fetchRoute();
    console.log("Retrigering");
  },[pointB]);


  // Get zoom level from the viewport state
  const zoom = viewPort.zoom;

  // Adjust marker size based on zoom level with a gradual increase when zooming out
  const markerSize = zoom > 12 ? 40 : zoom > 10 ? 35 : zoom > 8 ? 30 : 25;
  const [geoJsonRoutes, setGeoJsonRoutes] = useState([]);

  async function optimizePath(val){
    const num = parseInt(val);
    const userLocation = {lat:27.4924,lng:77.6737};
    let res = await optimizeDeliveryPath(num,markedPlace,userLocation);
    console.log(res);
    setGeoJsonRoutes(res.routes);
    setMarkedPlace(res.clusters);
  }

  function clearPath(){
    setGeoJsonRoutes([]);
    setMarkedPlace([]);
  }

  return (
    <div className="relative w-screen h-screen">
      {/* Sidebar */}
      <div
        style={{
          position: "absolute",
          // top: "80px", // Adjust based on Navbar height
          // left: "20px",
          width: "350px", // Adjust width as needed
          zIndex: 10,
        }}
      >
      </div>
      <FunctionBox optimizePath={(val)=>{optimizePath(val)}} clearPath={clearPath}/>

      {/* Map */}
      <Map
        {...viewPort}
        width="100vw"
        height="100vh"
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/sharadsinghcha-cs22/cm6s7km2j014n01r5h6te59x4"
        onClick={(evt)=>{handleMarkerClick(evt)}}
        onMove={evt => setViewPort(evt.viewState)}

        className="w-full h-full"
      >
        { <Marker latitude={27.4924} longitude={77.6737}>
              <div
                className=" border-1 border-[#21bc06] bg-[#39ff14] rounded-full flex items-center justify-center shadow-md cursor-pointer"
                style={{
                  height: `${markerSize}px`,
                  width: `${markerSize}px`,
                }} // Dynamically adjust marker size
              >
                <EmojiEmotionsIcon className = "h-6 w-6"/>
              </div>
            </Marker> }
        {markedPlace.length>0 && markedPlace.map((place,index)=>(
          <Marker key={index} latitude={place.lat} longitude={place.lng}>
            <div
              className=" border-1 border-[#21bc06] bg-[#39ff14] rounded-full flex items-center justify-center shadow-md cursor-pointer"
              style={{
                height: `${markerSize}px`,
                width: `${markerSize}px`,
              }} // Dynamically adjust marker size
            >
            {place.centroidIndex||place.centroidIndex==0 ?<span className="text-xl font-semibold">{place.centroidIndex}</span>:<RoomIcon  className = "h-6 w-6"/>}
            </div>
          </Marker>
        ))}
        {/* {citiesData.cities.map((city, index) => (
          <Marker
            key={index}
            latitude={city.latitude}
            longitude={city.longitude}
          >
            <div
              className=" border-1 border-[#21bc06] bg-[#39ff14] rounded-full flex items-center justify-center shadow-md cursor-pointer"
              style={{
                height: `${markerSize}px`,
                width: `${markerSize}px`,
              }} // Dynamically adjust marker size
              onClick={() => setSelectedCity(city)}
            >
              <img
                className="h-6 w-6"
                src="/location.png"
                alt="Location Marker"
              />
            </div>
          </Marker>
        ))} */}
      {geoJsonRoutes.length>0 && geoJsonRoutes.map((route, index) => (
        <Source key={index} type="geojson" data={route}>
            <Layer
                id={`route-${index}`}
                type="line"
                paint={{
                    "line-color": route.properties.color,
                    "line-width": 4,
                }}
            />
        </Source>
    ))}
      </Map>
    </div>
  );
};

export default MapComponent;