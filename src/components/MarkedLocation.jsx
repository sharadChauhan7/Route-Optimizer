import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FunctionBox from './FunctionBox';
import DeleteIcon from '@mui/icons-material/Delete';
function MarkedLocation({ markedPlaceInfo,handleDelete }) {
  console.log(markedPlaceInfo);
  return (
    <>
      {markedPlaceInfo.length > 0 ? <div className='absolute z-10 border-2 border-green-600 overflow-y-auto mt-30  mx-5 max-h-4/5 rounded-3xl bg-[#1e1e1e] text-white w-md flex flex-col  justify-center items-end '>
        {markedPlaceInfo && markedPlaceInfo.map((option, idx) => {
          return <div key={uuidv4()} className='border-t w-full flex   py-2 first:border-non first:pt-5 hover:bg-gray-500 border-green-600 px-5'>
            <div className='flex items-center justify-center mr-2 w-1/6'>
              <LocationOnIcon fontSize="large" />
            </div>
            <div className='w-4/6'>
              <h2 className="text-xl font-semibold text-gray-200">{option.name}</h2>
              <h4 className=' font-medium text-gray-400'>{option.place}</h4>
            </div>
            <div className='flex items-center justify-center mx-3 w-1/6'>
                <DeleteIcon fontSize="large" onClick={(()=>{handleDelete(option.id)})} className='text-red-500 hover:text-red-700 cursor-pointer' />
            </div>
          </div>
        })}
      </div> : <></>}
    </>
  )
}

export default MarkedLocation