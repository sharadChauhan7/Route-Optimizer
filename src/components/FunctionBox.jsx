import React from 'react'
function FunctionBox({ optimizePath ,clearPath}) {
    const [cluster, setCluster] = React.useState("");
    return (
        // <div className='absolute z-10 flex justify-center items-center py-8 bg-transparent w-full border-2 border-red-400'>
            <div  className=' flex gap-4 rounded-4xl px-5 py-2   text-white  p-0 border-2 border-green-600 bg-[#1e1e1e]  '>
                <input type="text" value={cluster } onChange={(e)=>{setCluster(e.target.value)}} placeholder='Number of Cluster' className='w-40 border-2 text-black focus:outline focus:outline-green-400 bg-green-300 py-1 border-green-600 rounded-3xl pl-2' />
                <button onClick={()=>{optimizePath(cluster)}} className=' rounded-2xl text-gray-700 font-semibold py-1 bg-green-300 hover:bg-green-400 active:bg-green-400 px-2'>Optize Path</button>
                <button onClick={clearPath} className=' rounded-2xl text-gray-700 font-semibold py-1 bg-green-300 hover:bg-green-400 active:bg-green-400 px-2'>Clear Paths</button>
            </div>
        //  </div>
    )
}

export default FunctionBox