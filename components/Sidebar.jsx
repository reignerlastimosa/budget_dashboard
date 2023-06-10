import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { RxComponent1, RxMoon, RxSun, RxCalendar } from 'react-icons/rx';
import { MdOutlineDashboard, MdOutlineWorkHistory } from "react-icons/md";

import { FiSettings } from 'react-icons/fi';

const Sidebar = ({ children, dark, setDark}) => {

  


  
  return (
    <div className='flex'>
      <div className= {'fixed w-20 h-screen p-4 bg-[#252339]  flex flex-col justify-between '}>
        <div className='flex flex-col items-center'>
          <Link href='/'>
            <div className='bg-[#64d281] text-white p-3 rounded-lg inline-block'>
              <RxComponent1 size={20} />
            </div>
          </Link>
          <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
          <Link href='/'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <MdOutlineDashboard size={20} />
            </div>
          </Link>
          <Link href='/transaction'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <MdOutlineWorkHistory size={20} />
            </div>
          </Link>

          
         
          <Link href='/balance'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <RxCalendar size={20} />
            </div>
          </Link>

          <button onClick={()=>setDark(!dark)}> 

          {   !dark ?

          <div className='bg-[#373269] text-white  cursor-pointer my-4 p-3 rounded-lg inline-block absolute bottom-0 left-1/2 transform -translate-x-1/2'>
          
           <RxMoon size={20}/> 
           </div> : 
           
           <div className='bg-yellow-200  cursor-pointer my-4 p-3 rounded-lg inline-block absolute bottom-0 left-1/2 transform -translate-x-1/2'><RxSun size={20}/> </div> }
            </button>
        </div>
      </div>
      <main className='ml-20 w-full'>{children}</main>
    </div>
  );
};

export default Sidebar;