import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { DetailsHeader,Error,Loader,RelatedSongs } from '../components';
import { setActiveSong,playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery } from '../redux/services/shazamCore';
// import Loader from '../components';

function SongDetails() {


    const dispatch = useDispatch();
    const {activeSong,isPlaying} = useSelector((state)=>state.player);

    
    const {songid}=useParams();

    const{data:songData,isFetching:isFetchingSongDetails} = useGetSongDetailsQuery({songid});
   

    if(isFetchingSongDetails){
    
   return  <Loader title="Loading Songs..." />
  }

    

  return (
    <div className='flex flex-col'>
        <DetailsHeader artistId="" songData={songData} />

        <div className='mb-10'>
            <h2 className='text-white text-3xl font-bold'>
                 Lyrics:
            </h2>

            <div className='mt-5'>
                {
                    songData?.sections[1].type==='LYRICS'
                    ? songData?.sections[1].text.map((Line,i)=>(
                        <p className='text-gray-400 text-base my-1'>{Line}</p>
                    )): <p className='text-gray-400 text-base my-1'>Sorry,Lyrics not found...</p>

                }

            </div>
        </div>
       <h1 className='font-bold text-white text-2xl'>Related Songs :</h1>
        <RelatedSongs
        songid={songid}
        />
      
    </div>
  )
}

export default SongDetails
