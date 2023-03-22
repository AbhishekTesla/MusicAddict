
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {RiCloseLine} from 'react-icons/ri'

import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({handleClick})=>{

return <div className="mt-10">
    {
      links.map((link)=>{
        const {name,to} = link;
        return <NavLink  className="flex justify-start items-center text-sm my-8 font-medium text-gray-400 hover:text-cyan-400 flex-row px-2 m-4  md:text-xl"
        key={name}
        to={to}
        onClick={()=> handleClick && handleClick()}
        >
          <link.icon className="w-6 h-6 mx-2 mr-2"/>
          {name}
        </NavLink>
      })
    }

  </div>
  
}


function Sidebar(){

  const [device,setDevice] = useState(false);



  return <>

  <div className="md:flex flex-col hidden w-[240px] py-10 px-4 bg-[#191624]">
  
  <img src={logo}  alt="/" className="w-full  h-14 object-contain cursor-pointer" />
      
      <NavLinks />

  </div>

  <div className="absolute md:hidden block top-6 right-3">

    {
      device? <  RiCloseLine className="w-6 h-6 text-white mr-2 mt-3 cursor-pointer" onClick={()=>setDevice(false)} /> : <HiOutlineMenu className="w-6 h-6 mt-3 cursor-pointer text-white mr-2" onClick={()=>setDevice(true)} />
    }
  </div>

  <div className={`absolute top-0  h-full w-2/3 from-white/10 backdrop-blur-lg to-[#483d8b]  bg-gradient-to-tl z-10 p-6 md:hidden smooth-transition ${device ? 'left-0':'-left-full'}`}>
  
  <img src={logo}  alt="/" className="w-full mt-5 h-14 object-contain cursor-pointer" />
      
      <NavLinks handleClick={()=>setDevice(false)} />

  </div>

  
  </>
}

export default Sidebar;
