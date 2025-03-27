import React from 'react'

function FunctionBox({ optimizePath }) {
    const [cluster, setCluster] = React.useState("");
    return (
        <div className=' absolute z-10 flex justify-center items-center py-8 bg-transparent w-full'>
            <div  className='flex gap-4 rounded-4xl px-5 py-2   text-white  p-0 border-2 border-green-300 bg-[#0e0e11]  '>
                <input type="text" value={cluster } onChange={(e)=>{setCluster(e.target.value)}} placeholder='Number of Cluster' className='w-40 border-2 text-black bg-green-300 py-1 border-green-400 rounded-3xl pl-2' />
                <button onClick={()=>{optimizePath(cluster)}} className=' rounded-2xl text-black font-semibold py-1 bg-green-300 hover:bg-green-400 active:bg-green-400 px-2'>Optize Path</button>
            </div>
        </div>
    )
}

export default FunctionBox