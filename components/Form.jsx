import React, { useState, useEffect } from 'react';

const Form = ({showComponent, setShowComponent, dashboardValues, setDashboardValues, dark}) => {
    const [showForm, setShowForm] = useState(false);
    const [formValues, setFormValues] = useState({});
   
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };


      const handleSubmit = () =>{
        localStorage.setItem('dashboard_values', JSON.stringify(formValues));
        setShowComponent(false);
      }


    return (

<div className={dark ? 'w-[500px] h-[60vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#252339] flex flex-col justify-center text-center p-6' :'w-[500px] h-[60vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col justify-center text-center p-6'} >
{!showForm ? (
  <>
  
    <label>Name: Reigner</label>
    <label>Balance: P1,560</label>
    <button className="bg-red-100 w-[200px]" onClick={()=> setShowForm(!showForm)}>Edit</button>
   
  </>
) : (
  <>

    <input type='text' name="dashboard_name" placeholder="Please input your name" value={formValues.dashboard_name} onChange={handleInputChange} />
    <input type='text' name="dashboard_balance" placeholder="Please input your cash balance" value={formValues.dashboard_balance} onChange={handleInputChange}/>
    <button className='bg-red-100 w-[200px]' onClick={()=> handleSubmit()}>
      Save
    </button>

    

    
  </>
)}
</div>

);
};


export default Form;