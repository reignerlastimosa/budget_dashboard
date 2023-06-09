import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RxComponent1 } from 'react-icons/rx';
const Form = ({ showComponent, setShowComponent, dashboardValues, setDashboardValues, dark }) => {
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const storedValues = JSON.parse(localStorage.getItem('dashboard_values'));

    if (storedValues) {
      setFormValues(storedValues);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (showForm) {
      if (formValues.dashboard_name && formValues.dashboard_balance) {
        localStorage.setItem('dashboard_values', JSON.stringify(formValues));
        setShowComponent(false);
      } else {
        window.alert('Please fill in all the fields.');
      }
    } else {
      window.alert('No values found...');
    }
  };

  return (
    <div
      className={`${
        dark
          ? 'w-[500px] h-[60vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-100 flex flex-col justify-center items-center p-6 rounded-lg shadow-lg'
          : 'bg-blue-100 w-[500px] h-[60vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-6 rounded-lg shadow-lg'
      }`}
    >
      <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-500" onClick={() => setShowComponent(false)}>
        <IoMdClose size={20} />
      </button>
      {!showForm ? (
        <>
       
      

          <label className="text-black text-lg">Name: {formValues.dashboard_name || 'None'}</label>
          <label className="text-black text-lg">Balance: {formValues.dashboard_balance || 'None'}</label>
          <button className="bg-[#64d281] w-3/5 mt-4 text-xl rounded-lg" onClick={() => setShowForm(true)}>
            Edit
          </button>
          <p className="fixed bottom-5 left-0 w-full text-center text-gray-400">Made by Reigner and ChatGPT</p>
        </>
      ) : (
        <>
        
          <input
            type="text"
            name="dashboard_name"
            placeholder="Please input your name"
            value={formValues.dashboard_name || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="dashboard_balance"
            placeholder="Please input your cash balance"
            value={formValues.dashboard_balance || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-[#64d281] w-full px-4 py-2 rounded-lg" onClick={() => handleSubmit()}>
            Save
          </button>

          <p className="fixed bottom-5 left-0 w-full text-center text-gray-400">Made by Reigner and ChatGPT</p>
        </>
      )}
    </div>
  );
};

export default Form;
