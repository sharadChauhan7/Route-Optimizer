import React, { useState ,useEffect} from "react";
// import ReactMapGL, { Marker, Popup,Source,Layer } from "react-map-gl";
import Map,{ Marker, Popup,Source,Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import citiesData from "../data/citiesData";
// import MapSidebar from "./MapSidebar";
import MapMarker from "./MapMarker";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {

  let [pointA, setPointA] = useState([77.6737,27.4924]);
  let [pointB, setPointB] = useState([77.6737,27.4924]);
  const [route, setRoute] = useState(null);

  const [viewPort, setViewPort] = useState({
    latitude: 27.4955539,
    longitude: 77.6855554,
    zoom: 12,
    bearing: 0,  // Ensure bearing is set
      pitch: 0,
  });
  useEffect(() => {
    const fetchRoute = async () => {
    //  const response  = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pointA[0]},${pointA[1]};${pointB[0]},${pointB[1]}?alternatives=false&continue_straight=false&geometries=geojson&overview=simplified&steps=false&access_token=${accessToken}`)
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


  const [selectedCity, setSelectedCity] = useState(null);

  // Get zoom level from the viewport state
  const zoom = viewPort.zoom;

  // Adjust marker size based on zoom level with a gradual increase when zooming out
  const markerSize = zoom > 12 ? 40 : zoom > 10 ? 35 : zoom > 8 ? 30 : 25;

  async function changeCordinates(pointB){
    const cord = [
      [77.78966526588162,27.554974823977666],
      [77.61521979788179,27.582987823609056],
      [77.5311596667924,27.4850587716792,],
      [77.62571645752517,27.398717571280308]
    ];
    console.log(pointB);
    setPointB((prev)=>cord[pointB]);
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

      {/* Map */}
      <Map
        {...viewPort}
        width="100vw"
        height="100vh"
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/sharadsinghcha-cs22/cm6s7km2j014n01r5h6te59x4"
        
        onViewportChange={(newViewPort) => setViewPort(newViewPort)}
        className="w-full h-full"
      >
        <Marker latitude={27.4924} longitude={77.6737}>
              <div
                className=" border-1 border-[#21bc06] bg-[#39ff14] rounded-full flex items-center justify-center shadow-md cursor-pointer"
                style={{
                  height: `${markerSize}px`,
                  width: `${markerSize}px`,
                }} // Dynamically adjust marker size
              >
                <img
                  className="h-6 w-6"
                  src="/location.png"
                  alt="Location Marker"
                />
              </div>
            </Marker>
        {citiesData.cities.map((city) => (
          <div key={city.name}>
            {/* Location Marker */}
            <Marker latitude={city.latitude} longitude={city.longitude}>
              <div
                className="bg-[#0a0a0a] border-1 border-white rounded-full flex items-center justify-center shadow-md cursor-pointer"
                style={{
                  height: `${markerSize}px`,
                  width: `${markerSize}px`,
                }} // Dynamically adjust marker size
                onClick={() =>
                  setSelectedCity(
                    selectedCity?.name === city.name ? null : city
                  )
                } // Toggle Popup
              >
                <img
                  className="h-6 w-6"
                  src="/location.png"
                  alt="Location Marker"
                />
              </div>
            </Marker>

            {/* Popup without White Border */}
            {selectedCity?.name === city.name && (
              <Popup
                latitude={city.latitude}
                longitude={city.longitude}
                closeButton={false}
                closeOnClick={true}
                onClose={() => setSelectedCity(null)}
                anchor="right"
                className="!bg-transparent !shadow-none border-none p-0 m-0" // Fix border issue
                offset={[10, -20]} // Adjust positioning
              >
                <div className="p-0 m-0"> 
                  {/* Custom MapMarker Component */}
                  <MapMarker
                    location={city.name}
                    imageSrc={"/toronto.webp"}
                    reviews={120}
                  />
                </div>
              </Popup>
            )}
          </div>
        ))}
        {route && (
        <Source id="route" type="geojson" data={{ type: "Feature", geometry: route }}>
          <Layer
            id="route-line"
            type="line"
            paint={{ "line-color": "#39ff14", "line-width": 4 }}
          />
        </Source>
      )}
      </Map>
    </div>
  );
};

export default MapComponent;