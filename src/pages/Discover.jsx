import React from 'react'
import { Loader,Error,SongCard } from '../components'
import {genres} from '../assets/constants'
import { useGetToChartsQuery } from '../redux/services/shazamCore'
import { useSelector,useDispatch } from 'react-redux'


function Discover() {
  const {data,isFetching,isError} = useGetToChartsQuery()

  const dispatch = useDispatch();

  const { isPlaying,activeSong} = useSelector((state)=>state.player)

  
  if(isFetching){
    
   return  <Loader title="Loading Songs..." />
  }

  if(isError){
console.log(isError)
    return <Error/>
  }



console.log(data);


  return (
   <div className='flex flex-col'>

    <div className='flex flex-col md:flex-row  mt-4 mb-10  justify-between w-full items-center '>
         <h2 className='mb-4 text-white font-bold text-3xl'>Discover</h2>
         <select onChange={()=>{}} value="" className='bg-black border-none cursor-pointer   p-2 md:p-3 text-white rounded-lg' >
           
            {
              genres.map((genre)=>{
                return  <option className='p-1   cursor-pointer text-white' value={genre.value} key={genre.value}>{genre.title}</option>
              })
            }
          
         </select>

    </div>

    <div className='flex md:justify-start flex-wrap gap-8 justify-center '>
      {
        data?.map((song,i)=>{
          return <SongCard 
          isPlaying={isPlaying}
          activeSong ={activeSong}
          key={song.key}
          song={song}
          data={data}
          i={i}
          />
        })
      }

    </div>

  
   </div>
  )
}

export default Discover

