import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function MarkedLocation() {
  let location =[{name:"Mathura",place:"281006 Mathura"},
    {name:"Mathura",place:"281006 Mathura"},
    {name:"Mathura",place:"281006 Mathura"},
    {name:"Mathura",place:"281006 Mathura"},
    {name:"Mathura",place:"281006 Mathura"},
    {name:"Mathura",place:"281006 Mathura"},
    {name:"Mathura",place:"281006 Mathura"},
    {name:"Mathura",place:"281006 Mathura"},
    {name:"Mathura",place:"281006 Mathura"},
    {name:"Mathura",place:"281006 Mathura"},
    {name:"Mathura",place:"281006 Mathura"},
    {name:"Mathura",place:"281006 Mathura"},
    {name:"Mathura",place:"281006 Mathura"},
  ];
  return (
    <div className='absolute z-10 border-2 border-green-600 overflow-scroll mt-30 mx-5 max-h-4/5 rounded-3xl bg-gray-600 text-white w-xs flex flex-col justify-center items-center '>
          {location.map((option,idx)=>{
            return <div key={uuidv4()} onClick={()=>{handleSuggestion(option.name,option.place)}} className='border-t w-full  first:border-none py-2 hover:bg-gray-500 border-green-600 px-5'>
              <LocationOnIcon/>
            <h2 className="text-xl font-semibold text-gray-200">{option.name}</h2>
            <h4 className=' font-medium text-gray-400'>{option.place}</h4>
          </div>
          })}
    </div>
  )
}

export default MarkedLocation