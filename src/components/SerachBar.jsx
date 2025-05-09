import React, { useEffect } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {toast} from 'sonner';
import axios from 'axios';
import {getLocationById} from '../util/mapboxapi'

function SerachBar({setMarkedPlace, setMarkedPlaceInfo,setViewPort,map}) {

    const [searchLocation,setSearchLocation] = useState("");
    const [location, setlocation] = useState("");

    useEffect(()=>{
        if(location){
            var delay = setTimeout(async ()=>{
                await getSeggestions(); 
            },500);  
        }
        else{
            setSearchLocation("");
        }
        return () => clearTimeout(delay);
    },[location]);

    async function getSeggestions(){ 
        try{
            // pause this function for two second
        let url = `${import.meta.env.VITE_MAPBOX_SEARCH_API}${location}&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}&session_token=${import.meta.env.VITE_MAPBOX_SESSION_TOKEN+import.meta.env.VITE_MAPBOX_CATEGORY}&proximity=77.59560985353959%2C27.60290895561135`;
        let result = await axios.get(url);
        console.log(result.data);
        setSearchLocation(result.data);
        }
        catch(err){
            toast.error("Can not Fetch Suggestions");
            console.log(err);
        }
    };

    async function handleSuggestion(id,name,place){
        console.log(id+" " +name+" "+ place);
        setlocation("");
        let obj = await getLocationById(id);
        console.log(obj);
        let lat = obj.coordinates.latitude;
        let lng = obj.coordinates.longitude;
        setMarkedPlaceInfo((prev)=>[...prev,obj]);
        setMarkedPlace((prev)=>[...prev,{id:obj.id,lat:lat,lng:lng}]);
        setViewPort((prev) => ({
            ...prev,
            longitude: lng,
            latitude: lat,
          }));
          map.current?.flyTo({
            center: [lng, lat],
            zoom: 13,
            duration: 1400,
          });
    }

    return (
            <div className='w-xl'>
                <input type="text" value={location} onChange={(e)=>{setlocation(e.target.value)}} placeholder='Search' className='w-lg text-white bg-[#1e1e1e] border-2 text-xl border-green-600 rounded-4xl px-5 py-2 focus:border-green-400 focus:outline focus:outline-green-400' />
                {searchLocation && <div className='bg-[#1e1e1e] w-lg overflow-hidden rounded-3xl border-2 border-green-600 mt-3'>
                    {searchLocation.suggestions.map((location, idx) => {
                        return <div key={uuidv4()} onClick={()=>{handleSuggestion(location.mapbox_id,location.name,location.place_formatted)}} className='border-t  first:border-none py-2 hover:bg-gray-900 border-green-600 px-5'>
                            <h2 className="text-xl font-semibold text-gray-200">{location.name}</h2>
                            <h4 className=' font-medium text-gray-400'>{location.place_formatted}</h4>
                        </div>
                    })}
                </div>}
            </div>
    )
}
export default SerachBar