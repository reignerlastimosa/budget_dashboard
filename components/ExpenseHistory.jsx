import React from 'react';

import { FaShoppingBag } from 'react-icons/fa';
import {SiCashapp} from 'react-icons/si';
const RecentOrders = ({savedExpense, dark}) => {
  return (
    <div className= {!dark? 'w-full col-span-1 relative lg:h-[32vh] h-[50vh]  p-4 border rounded-lg bg-white overflow-scroll' : 'w-full col-span-1 relative lg:h-[32vh] h-[50vh]  p-4 border rounded-lg bg-[#272741] overflow-scroll text-white'}>
      <h1>Last Transactions</h1>
      <ul>
        {savedExpense.map((order, id) => (
          <li
            key={id}
            className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'
          >
            <div className='bg-[#64d281] rounded-lg p-3'>
              <SiCashapp className='text-[#63a273]' />
            </div>
            <div className='pl-4'>
              <p className='text-gray-800 font-bold'>{order.expense_name}</p>
              <p className='text-gray-400 text-sm'>&#8369;{order.expense_amount}</p>
            </div>
            <p className='lg:flex md:hidden absolute right-6 text-sm'>{order.expense_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;