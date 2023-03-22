import React from 'react'
import Loader from './Loader';
import Error from './Error';
import PlayPause from './PlayPause';
import { playPause,setActiveSong } from '../redux/features/playerSlice';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetartistsDetailsQuery } from '../redux/services/shazamCore'



const TopChartCard = ({song,i,isPlaying,activeSong,data})=>{
  
const dispatch = useDispatch();
  const handlePauseClick=()=>{
dispatch(isPlaying(false));
  }

  const handlePlayClick = ()=>{
    dispatch(setActiveSong({song,data,i}));
    dispatch(isPlaying(true));
  }

  return <>
  <div className='w-full  flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2'>
   
   <h3 className='font-bold text-base text-white mr-3'>{i+1}</h3>
 
 <div className='flex-1 flex flex-row justify-between items-center'>
<div className='flex items-center '>
<img src={song?.share?.avatar || song?.images?.background ||song?.images?.coverart} className='max-w-[60px] rounded-md'  alt="/" />

<div>
<Link to={`/songs/${song.key}`}>
  <p className='hover:text-blue-400  text-sm ml-3 font-bold text-white'>
    {song?.title.substring(0,20)+'...'}
  </p>
</Link>
{/* to={`/artists/${song?.artists[0].adamid}`} */}
<Link to={`/artists/${song?.artists[0].adamid}`}>
  <p className='text-[0.7em] hover:text-blue-400 ml-3 mt-1  text-white'>
    {song?.subtitle}
  </p>
</Link>
</div>

</div>

<PlayPause
 isPlaying={isPlaying}
  activeSong={activeSong}
  song={song}
  handlePause = {handlePauseClick}
  handlePlay = {handlePlayClick}
/>

 </div>

  </div>
  </>
}


function RelatedSongs({songid}) {

  const dispatch = useDispatch();
  const {activeSong,isPlaying} = useSelector((state)=>state.player);

const{data,isFetching,isError} = useGetartistsDetailsQuery({songid});
 const topPlays = data?.slice(0,8);
 
if(isFetching){
<Loader />
}

if(isError){
  <Error/>
}

console.log(data);
  return (
     <div className='mt-4 flex flex-col gap-1'>
        {
          topPlays?.map((song,i)=>(
            <TopChartCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
           
            />
          ))
        }

      </div>
  )
}

export default RelatedSongs