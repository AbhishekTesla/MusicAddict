import React from 'react'
import { Link } from 'react-router-dom';

function DetailsHeader({artistId,artistData,songData}) {
  const artist = artistData?.artists[artistId].attributes;
  return (
   <div className='relative w-full flex flex-col'>
    <div className='w-full   sm:h-48 h-28' />
      
      <div className='absolute inset-0 flex items-center'>
        <img src={artistId?artist?.artwork?.url.replace('{w}','500').replace('{h}','500'): songData?.images?.coverart  } 
        className=' cursor-pointer sm:w-48 w-28 sm:h-45 h-25 rounded-full object-cover border-2 shadow-xl shadow-black'
        alt="/" />

        <div className='ml-5'>
          <p className='text-xl sm:text-3xl font-bold text-gray-300 '>{artistId?artist?.name : songData?.title}</p>
          {
            !artistId && (
              <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className='text-base cursor-pointer text-gray-400 hover:text-blue-400 mt-2'> {songData?.subtitle}</p>
              </Link>
            )
          }
     <p className='text-base cursor-pointer text-gray-400 hover:text-blue-400 mt-2'>
      {
        artistId? artist?.genreNames[0]:songData?.genres?.primary
      }

     </p>
        </div>

      </div>

      <div className='w-full sm:h-44 h-24' />
    
   </div>
  )
}

export default DetailsHeader
