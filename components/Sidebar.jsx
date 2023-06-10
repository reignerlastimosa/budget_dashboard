import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { RxBarChart, RxMoon, RxSun, RxCalendar } from 'react-icons/rx';
import { MdOutlineDashboard, MdOutlineWorkHistory } from "react-icons/md";

import { FiSettings } from 'react-icons/fi';

const Sidebar = ({ children, dark, setDark}) => {

  


  
  return (
    <div className='flex'>
      <div className= {'fixed w-20 h-screen p-4 bg-[#252339]  flex flex-col justify-between'}>
        <div className='flex flex-col items-center'>
          <Link href='/'>
            <div className='bg-[#44005f] text-white p-3 rounded-lg inline-block'>
              <RxBarChart size={20} />
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
          <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block absolute bottom-0 '>
          
           {   !dark ? <RxMoon size={20}/> : <RxSun size={20}/> }
            </div></button>
        </div>
      </div>
      <main className='ml-20 w-full'>{children}</main>
    </div>
  );
};

export default Sidebar;