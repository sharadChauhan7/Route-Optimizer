import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
export const reverseGeocode = async (lng,lat)=>{
    try{
        console.log("Api triggerinhg");
        let url = `${import.meta.env.VITE_MAPBOX_REVERSE_GEOCODE}longitude=${lng}&latitude=${lat}&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`;
        console.log(url);
        let result = await axios.get(url);
        console.log(result.data)
        let {name,place_formatted,coordinates} = result.data.features[0].properties;
        let locality = result.data.features[0].properties.context.locality;
        let localName;
        if(locality){
            localName = locality.name;
        }
        return {id:uuidv4(),name:localName?localName:name,place:place_formatted,coordinates};
    }
    catch(err){
        console.log(err);
    }   
}