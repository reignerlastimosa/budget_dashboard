import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Form from '../components/Form';

const Balance = ({
  savedExpense,
  dark,
  showComponent,
  dashboardValues,
  setDashboardValues,
  setShowComponent
}) => {
  const [categoryTotals, setCategoryTotals] = useState({});
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const updatedCategoryTotals = {};

    const filteredExpense = savedExpense.filter(expense => {
      if (filterType === 'monthly') {
        const currentDate = new Date();
        const expenseDate = new Date(expense.expense_date);
        return (
          expenseDate.getMonth() === currentDate.getMonth() &&
          expenseDate.getFullYear() === currentDate.getFullYear()
        );
      } else if (filterType === 'weekly') {
        const currentDate = new Date();
        const expenseDate = new Date(expense.expense_date);
        const timeDiff = Math.abs(currentDate - expenseDate);
        const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      } else {
        return true;
      }
    });

    filteredExpense.forEach(expense => {
      const expenseAmount = parseFloat(expense.expense_amount);

      if (updatedCategoryTotals[expense.expense_category]) {
        updatedCategoryTotals[expense.expense_category] += expenseAmount;
      } else {
        updatedCategoryTotals[expense.expense_category] = expenseAmount;
      }
    });

    setCategoryTotals(updatedCategoryTotals);
  }, [savedExpense, filterType]);

  const handleFilterChange = type => {
    setFilterType(type);
  };

  const totalExpense = Object.values(categoryTotals).reduce(
    (total, categoryTotal) => total + categoryTotal,
    0
  );

  return (
    <div className={!dark ? 'bg-gray-100 min-h-screen ' : 'bg-[#272741] min-h-screen '}>
      <div className={!dark ? 'text-black' : 'text-white'}>
        <Header
          showComponent={showComponent}
          setShowComponent={setShowComponent}
          dashboardValues={dashboardValues}
        />
      </div>
      <div
        className={`w-full md:col-span-1  lg:h-[35vh] h-[50vh] ${
          dark ? 'bg-[#272741] ' : 'bg-gray-100 '
        } flex flex-col justify-center items-center`}
      >
        <div className="flex justify-center mt-4 space-x-4">
          <button
            className={`${
              filterType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } py-2 px-4 rounded-lg`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button
            className={`${
              filterType === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } py-2 px-4 rounded-lg`}
            onClick={() => handleFilterChange('monthly')}
          >
            Monthly
          </button>
          <button
            className={`${
              filterType === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } py-2 px-4 rounded-lg`}
            onClick={() => handleFilterChange('weekly')}
          >
            Weekly
          </button>
        </div>
        <table className="mt-4 bg-white w-[80%] rounded-lg bg-white overflow-y-auto">
          <thead>
            <tr>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Total Expense</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(categoryTotals).map(([category, total]) => (
              <tr key={category} className="text-center">
                <td className="px-6 py-4">{category}</td>
                <td className="px-6 py-4">&#8369;{total.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="text-center">
              <td className="px-6 py-4">Total</td>
              <td className="px-6 py-4 text-red-500 font-bold">&#8369;{totalExpense.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        {showComponent ? (
          <Form
            showComponent={showComponent}
            setShowComponent={setShowComponent}
            dashboardValues={dashboardValues}
            setDashboardValues={setDashboardValues}
            dark={dark}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Balance;
