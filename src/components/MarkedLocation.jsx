import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FunctionBox from './FunctionBox';
function MarkedLocation({markedPlaceInfo}) {
  console.log(markedPlaceInfo);
  return (
    <>
    <div className='absolute z-10 border-2 border-green-600 overflow-y-auto mt-30  mx-5 max-h-4/5 rounded-3xl bg-[#1e1e1e] text-white w-xs flex flex-col  justify-center items-end '>
          {markedPlaceInfo && markedPlaceInfo.map((option,idx)=>{
            return <div key={uuidv4()} onClick={()=>{handleSuggestion(option.name,option.place)}} className='border-t w-full flex py-2 first:border-non first:pt-5 hover:bg-gray-500 border-green-600 px-5'>
              <div>
              <LocationOnIcon/>
              </div>
              <div>
              <h2 className="text-xl font-semibold text-gray-200">{option.name}</h2>
              <h4 className=' font-medium text-gray-400'>{option.place}</h4>
            </div>
          </div>
          })}
    </div>
    </>
  )
}

export default MarkedLocation