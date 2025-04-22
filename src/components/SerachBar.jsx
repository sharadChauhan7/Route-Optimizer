import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {toast} from 'sonner'
import axios from 'axios'
function SerachBar() {

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
    });
    async function getSeggestions(){
        try{
            // pause this function for two second
        let url = `${import.meta.env.VITE_MAPBOX_SEARCH_API}${location}&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}&session_token=${ 'de11723e-2676-428c-943d-fa7554b85dd8'+import.meta.env.VITE_MAPBOX_CATEGORY}&proximity=77.59560985353959%2C27.60290895561135`;
        let result = await axios.get(url);
        setSearchLocation(result.data);

        }
        catch(err){
            toast.error("Can not Fetch Suggestions");
            console.log(err);
        }
    };
    function handleSuggestion(name,place){
        console.log(name+" "+ place);
        setlocation(name);
        // Retrive the data for this and mark the location
    }

    return (
        
            <div className='w-xl'>
                <input type="text" value={location} onChange={(e)=>{setlocation(e.target.value)}} placeholder='Search' className='w-lg text-white bg-[#1e1e1e] border-2 text-xl border-green-600 rounded-4xl px-5 py-2 focus:border-green-400 focus:outline focus:outline-green-400' />
                {searchLocation && <div className='bg-[#1e1e1e] w-lg overflow-hidden rounded-3xl border-2 border-green-600 mt-3'>
                    {searchLocation.suggestions.map((location, idx) => {
                        return <div key={uuidv4()} onClick={()=>{handleSuggestion(location.name,location.place_formatted)}} className='border-t  first:border-none py-2 hover:bg-gray-900 border-green-600 px-5'>
                            <h2 className="text-xl font-semibold text-gray-200">{location.name}</h2>
                            <h4 className=' font-medium text-gray-400'>{location.place_formatted}</h4>
                        </div>
                    })}
                </div>}
            </div>
    )
}

export default SerachBar