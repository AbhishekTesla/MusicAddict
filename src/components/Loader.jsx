
import React from 'react'
import {loader} from '../assets'

function Loader({title}) {
  return (
    <div className='flex justify-center items-center flex-col w-full'>
       
      <img src={loader} className=" w-20 md:w-40 h-30 object-contain" alt="loader" />
      <h1 className=' text-sm md:text-xl mt-1 text-white font-bold'>{title || "Loading..."}</h1>

      </div>
  )
}

export default Loader
