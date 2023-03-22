import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause,setActiveSong } from "../redux/features/playerSlice";

const errorimg = 'https://images.unsplash.com/photo-1566842937027-437d91739e89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNvbmdzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300'

const SongCard = ({song,i,isPlaying,activeSong,data}) => {
  
  const dispatch = useDispatch();

  const handlePlayClick=()=>{

   dispatch(setActiveSong({song,data,i}));

   dispatch(playPause(true))

  }

  const handlePauseClick=()=>{
    
    dispatch(playPause(false))

  }

  console.log(song);

// const activeSong = 'Test';

 return  <>
 <div className="flex  justify-start  flex-wrap w-[240px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
  >
 
    <div className="relative w-full h-fit group ">

 <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title==song.title ? 'flex bg-black bg-opacity-70':'hidden'}`}>

  <PlayPause 
  isPlaying={isPlaying}
  activeSong={activeSong}
  song={song}
  handlePause = {handlePauseClick}
  handlePlay = {handlePlayClick}
  />

 </div>
 
 <img className="rounded-md"  src={song.images?.coverart || song.images?.coverarthq || song.images?.background || errorimg  }  alt="/" />

  </div>

  <div className="mt-1 flex flex-col">

    <p className="text-white mb-1 mt-1 hover:text-blue-400 ">
      <Link to={song.artists?`/artists/${song?.artists[0]?.adamid}`:'/top-artists'} >
      {song.subtitle}

      </Link>
    </p>

    <p className="text-white text-sm font-semibold hover:text-blue-400 ">
      <Link to={`/songs/${song?.key}`}>
      { song.title.length<25 ? song.title : song.title+"..." }
      </Link>
    </p>
    

  </div>
    
   
    
    
    </div>
 
 </>
};

export default SongCard;
