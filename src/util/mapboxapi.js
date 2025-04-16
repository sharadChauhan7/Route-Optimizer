import axios from 'axios';
export const reverseGeocode = async (lng,lat)=>{
    try{
        console.log("Api triggerinhg");
        let url = `${import.meta.env.VITE_MAPBOX_REVERSE_GEOCODE}longitude=${lng}&latitude=${lat}&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`;
        console.log(url);
        let result = await axios.get(url);
        let {name,place_formatted,coordinates} = result.data.features[0].properties;
        return {name,place:place_formatted,coordinates};
    }
    catch(err){
        console.log(err);
    }
    
}