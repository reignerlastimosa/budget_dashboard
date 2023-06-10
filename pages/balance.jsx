import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from '../components/Form';
import Header from '../components/Header';
const Balance = ({ dark, showComponent, setShowComponent, dashboardValues, setDashboardValues}) => {
  const [selectedDate, setSelectedDate] = useState(null);
 

  useEffect(() => {
    setShowComponent(false);
  }, []);
  
 

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


 

  return (
    <div className={!dark ? 'bg-gray-100 min-h-screen' : 'bg-[#272741] min-h-screen text-white'}>
      <div >
        <Header showComponent ={showComponent} setShowComponent={setShowComponent} dashboardValues={dashboardValues}/>
      </div>
      <div className='p-4 flex justify-center flex-col'>
        <div className='mx-auto'>
          <h1>Select a Date</h1>
          <DatePicker selected={selectedDate} onChange={handleDateChange} open />
        </div>
        {showComponent ? <Form showComponent ={showComponent} setShowComponent={setShowComponent} dashboardValues={dashboardValues} setDashboardValues={setDashboardValues} dark={dark}/> : null}
      </div>
    </div>
  );
};

export default Balance;
