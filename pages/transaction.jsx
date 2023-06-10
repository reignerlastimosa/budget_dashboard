import React from 'react';
import { useState, useEffect } from 'react';
import { BsPersonFill, BsThreeDotsVertical } from 'react-icons/bs';
import {GrMoney} from 'react-icons/gr'
import Form from '../components/Form';
import Header from '../components/Header';
import { IoMdClose} from 'react-icons/io';

const transaction = ({dark, showComponent, setShowComponent, dashboardValues, setDashboardValues, dashboardBalance}) => {

  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({});
  
  const [savedExpense, setSavedExpense] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('financeData'));
    
    if (savedData) {
      setSavedExpense(savedData);
    }
  }, []);

  useEffect(() => {
    setShowComponent(false);
  }, []);
  

  const clickShowForm = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const balance = parseFloat(dashboardBalance);
    const expenseAmount = parseFloat(formValues.expense_amount);
  
    if (!isNaN(balance) && !isNaN(expenseAmount)) {
      if (balance < expenseAmount) {
        window.alert("You do not have enough balance...");
      } else {
        let existingData = localStorage.getItem('financeData');
        let newData = [];
  
        if (existingData) {
          existingData = JSON.parse(existingData);
  
          if (Array.isArray(existingData)) {
            newData = [...existingData, formValues];
          } else {
            newData = [formValues];
          }
        } else {
          newData = [formValues];
        }
  
        localStorage.setItem('financeData', JSON.stringify(newData));
      }
    } else {
      window.alert("You do not have available Balance");
    }

    window.location.reload();
  };
  
  
  
  
  

  return (
    <div className={!dark ? 'bg-gray-100 min-h-screen' : 'bg-[#272741] min-h-screen'}>
      
      <div>
      <Header showComponent ={showComponent} setShowComponent={setShowComponent} dashboardValues={dashboardValues}/>
      </div>
      <div className='p-4'>

        
      {showComponent ? <Form showComponent ={showComponent} setShowComponent={setShowComponent} dashboardValues={dashboardValues} setDashboardValues={setDashboardValues} dark={dark}/> : null}
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
          <div className='my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <span>Expense Name</span>
            <span className='sm:text-left text-right'>Category</span>
            <span className='hidden md:grid'>Amount Spent</span>
            <span className='hidden sm:grid'>Date of Purchase</span>
            <span className='hidden sm:grid' onClick={clickShowForm}>Add</span>
          </div>

          {

showForm ?
<div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-blue-100 p-4 rounded-lg shadow-lg flex flex-col">
  <button class="self-end text-gray-500" onClick={() => setShowForm(false)}>
  <IoMdClose size={20}/>
  </button>
  <br/>
  <input type="text" placeholder="Name" name="expense_name" value={formValues.expense_name} onChange={handleInputChange} class="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
  <input type="text" placeholder="Category" name="expense_category" value={formValues.expense_category} onChange={handleInputChange} class="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
  <input type="text" placeholder="Expense" name="expense_amount" value={formValues.expense_amount} onChange={handleInputChange} class="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
  <input type="date" placeholder="Expense" name="expense_date" value={formValues.expense_date} onChange={handleInputChange} class="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    
  <div class="flex justify-center">
    <button class="bg-[#64d281] text-white px-4 py-2 rounded-lg focus:outline-none">Submit</button>
  </div>
</div>







  :
""
  }

          
          <ul>
            {savedExpense.map((order, id) => (
                <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                    <div className='flex items-center'>
                        <div className='bg-[#64d281] p-3 rounded-lg'>
                            <GrMoney className='text-purple-800' />
                        </div>
                        <p className='pl-4'>{order.expense_name}</p>
                    </div>
                    <p className='text-gray-600 sm:text-left text-right'>{order.expense_category}</p>
                    <p className='hidden md:flex'>&#8369;{order.expense_amount}</p>
                    <div className='sm:flex hidden justify-between items-center'>
                        <p>{order.expense_date}</p>
                        <BsThreeDotsVertical />
                    </div>
                </li>
            ))}
          </ul>
          
        </div>
      </div>
    </div>
  );
};

export default transaction;