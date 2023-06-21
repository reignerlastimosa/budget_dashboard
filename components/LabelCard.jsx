import React, { useEffect, useState } from 'react';

const LabelCard = ({ savedExpense, dark, dashboardValues, dashboardBalance, setDashboardBalance }) => {
  const [transactionCount, setTransactionCount] = useState(0);

  useEffect(() => {
    if (dashboardValues) {
      try {
        const parsedDashboardValues = JSON.parse(dashboardValues);
        setDashboardBalance(parsedDashboardValues.dashboard_balance);
      } catch (error) {
        console.error(error);
      }
    }
  }, [dashboardValues]);

  useEffect(() => {
    setTransactionCount(savedExpense.length);
  }, [savedExpense]);

  const totalExpense = savedExpense.reduce((total, expense) => total + parseFloat(expense.expense_amount), 0);

  return (
    <div className="grid lg:grid-cols-5 gap-4 p-4">
      <div
        className={
          !dark
            ? 'lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'
            : 'lg:col-span-2 col-span-1 bg-[#272741] flex justify-between w-full p-4 rounded-lg text-white'
        }
      >
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">&#8369;{(dashboardBalance - totalExpense).toFixed(2)}</p>
          <p className={!dark ? 'text-gray-600' : 'text-white'}>Total Balance</p>
        </div>
      </div>
      <div
        className={
          !dark
            ? 'lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'
            : 'lg:col-span-2 col-span-1 bg-[#272741] flex justify-between w-full p-4 rounded-lg text-white'
        }
      >
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">&#8369;{totalExpense.toFixed(2)}</p>
          <p className={!dark ? 'text-gray-600' : 'text-white'}>Total Expense</p>
        </div>
      </div>
      <div
        className={
          !dark
            ? 'bg-white flex justify-between w-full border p-4 rounded-lg'
            : 'bg-[#272741] flex justify-between w-full p-4 rounded-lg text-white'
        }
      >
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">{transactionCount}</p>
          <p className={!dark ? 'text-gray-600' : 'text-white'}>Total Transaction</p>
        </div>
      </div>
    </div>
  );
};

export default LabelCard;
