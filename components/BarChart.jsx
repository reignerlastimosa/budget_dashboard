import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const BarChart = ({ savedExpense, dark,  }) => {
  const [chartData, setChartData] = useState({
    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
    datasets: [],
  });

 
  const [chartOptions, setChartOptions] = useState({
    plugins: {
      legend: {
        position: 'top',
        
      },

      title: {
        display: true,
        text: 'Daily Expense',
      },
      
    },
    maintainAspectRatio: false,
    responsive: true,
  });

  useEffect(() => {
    const updatedData = [0, 0, 0, 0, 0, 0, 0];

    savedExpense.forEach((expense) => {
      const expenseDate = new Date(expense.expense_date);
      const dayOfWeek = expenseDate.getDay(); 

      updatedData[dayOfWeek] += parseFloat(expense.expense_amount);
    });

    const updatedDatasets = [
      {
        label: 'Expenses in Peso',
        data: updatedData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgb(100, 210, 129)',
      },
    ];

    setChartData((prevChartData) => ({
      ...prevChartData,
      datasets: updatedDatasets,
    }));
  }, [savedExpense]);

  return (
    <>
      <div className= { !dark ? 'w-full md:row-span-2 md:col-span-2 relative lg:h-[70vh] h-[50vh]  margin-auto p-4 border rounded-lg bg-[white] ' : 'w-full md:row-span-2 md:col-span-2 relative lg:h-[70vh] h-[50vh]  margin-auto p-4  rounded-lg bg-[#272741] '}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default BarChart;
