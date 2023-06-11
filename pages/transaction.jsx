import React from 'react';
import { useState, useEffect } from 'react';

import { GrMoney } from 'react-icons/gr'
import Form from '../components/Form';
import Header from '../components/Header';
import { IoMdClose } from 'react-icons/io';

const Transaction = ({ dark, showComponent, setShowComponent, dashboardValues, setDashboardValues, dashboardBalance }) => {

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
    if (!showForm) {
      setFormValues({});
    }
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

  const handleDeleteExpense = (id) => {
    const updatedData = savedExpense.filter((expense, index) => index !== id);
    setSavedExpense(updatedData);
    localStorage.setItem('financeData', JSON.stringify(updatedData));
  };

  const handleEditExpense = (id) => {
    const expense = savedExpense[id];
    setFormValues(expense);
    setShowForm(true);
  };

  return (
    <div className={!dark ? 'bg-gray-100 min-h-screen' : 'bg-[#272741] min-h-screen'}>
      <div className={!dark ? 'text-black' : 'text-white'}>
        <Header showComponent={showComponent} setShowComponent={setShowComponent} dashboardValues={dashboardValues} />
      </div>
      <div className='p-4'>
        {showComponent ? <Form showComponent={showComponent} setShowComponent={setShowComponent} dashboardValues={dashboardValues} setDashboardValues={setDashboardValues} dark={dark} /> : null}
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
          <div className='my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer text-center' >
            <span>Expense Name</span>
            <span className=''>Category</span>
            <span className='hidden md:grid'>Amount Spent</span>
            <span className='hidden sm:grid'>Date of Purchase</span>
            <span className='hidden sm:grid font-bold text-green-600' onClick={clickShowForm}> + Add</span>
          </div>
          {showForm ? (
            <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-blue-100 p-4 rounded-lg shadow-lg flex flex-col">
              <button class="self-end text-gray-500" onClick={() => setShowForm(false)}>
                <IoMdClose size={20} />
              </button>
              <br />
              <input type="text" placeholder="Name" name="expense_name" value={formValues.expense_name} onChange={handleInputChange} class="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Category" name="expense_category" value={formValues.expense_category} onChange={handleInputChange} class="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Expense" name="expense_amount" value={formValues.expense_amount} onChange={handleInputChange} class="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="date" placeholder="Expense" name="expense_date" value={formValues.expense_date} onChange={handleInputChange} class="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div class="flex justify-center">
                <button class="bg-[#64d281] text-white px-4 py-2 rounded-lg focus:outline-none" onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          ) : (
            ""
          )}
         <ul>
  {savedExpense.map((order, id) => (
    <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
      <div className='flex items-center'>
        <div className='bg-[#64d281] p-3 rounded-lg'>
          <GrMoney className='text-purple-800' />
        </div>
        <div className='pl-4'>
          <p className='text-center'>{order.expense_name}</p>
        </div>
      </div>
      <div className='text-gray-600 text-center'>{order.expense_category}</div>
      <div className='hidden md:flex text-center items-center justify-center'>
        <span>&#8369;{order.expense_amount}</span>
      </div>
      <div className='text-center'>{order.expense_date}</div>
      <div className='sm:flex hidden justify-center items-center'>
        <button className='ml-2 text-white rounded-sm w-20 p-1 bg-blue-500' onClick={() => handleEditExpense(id)}>Edit</button>
        <button className='ml-2 text-white rounded-sm w-20 p-1 bg-red-500' onClick={() => handleDeleteExpense(id)}>Delete</button>
      </div>
    </li>
  ))}
</ul>


        </div>
      </div>
    </div>
  );
};

export default Transaction;
