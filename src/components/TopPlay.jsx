import React from 'react'
import { useEffect,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useGetToChartsQuery } from '../redux/services/shazamCore';
import { Link } from 'react-router-dom';
import {Swiper,SwiperSlide} from 'swiper/react';
import { FreeMode } from 'swiper';
import PlayPause from './PlayPause';
import { playPause,setActiveSong } from '../redux/features/playerSlice';

import 'swiper/css';
import 'swiper/css/free-mode';

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




function TopPlay() {
  const dispatch = useDispatch();
  const {activeSong,isPlaying} = useSelector((state)=>state.player);

  const {data} = useGetToChartsQuery();

  const divRef = useRef(null);

  useEffect(()=>{
    divRef.current.scrollIntoView({behavior:'smooth'});
  });

  const topPlays = data?.slice(0,5); //select top 5 songs

  

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
    <div className='w-full flex flex-col'>
      <div className='flex flex-row justify-between items-center'>
        <h2 className='text-white font-bold text-2xl' >Top Charts</h2>
        <Link to="/top-charts">
        <p className='text-gray-300 text-base cursor-pointer hover:text-blue-400'>See more</p>
        </Link>
      </div>

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

    </div>


    <div className='w-full flex flex-col mt-8'>

       <div className='flex flex-row justify-between items-center'>
        <h2 className='text-white font-bold text-2xl' >Top Artists</h2>
        <Link to="/top-artists">
        <p className='text-gray-300 text-base cursor-pointer hover:text-blue-400'>See more</p>
        </Link>
      </div>

      <Swiper
     slidesPerView="auto"
      spaceBetween={15}
      freeMode
      centeredSlides
      centeredSlidesBounds
      modules={[FreeMode]}
      className="mt-4"
      >

        {
          topPlays?.map((song,i)=>(

            <SwiperSlide
            key={song?.key}
            style={{width:'20%', height:'auto'}}
            className="shadow-lg rounded-full animate-slideright"
            >

              <Link to={`/artists/${song?.artists[0]?.adamid }`}>
                <img src={song?.share?.avatar || song?.images?.background} alt="/" className='rounded-full w-full object-cover' />
              </Link>
     
            </SwiperSlide>
          ))
        }

      </Swiper>




    </div>

      </div>
  )
}

export default TopPlay
