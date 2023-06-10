import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PieChart = ({ savedExpense, dark }) => {
  const [chartData, setChartData] = useState({
    labels: [],
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
    const categoryTotals = {};

    savedExpense.forEach((expense) => {
      const expenseAmount = parseFloat(expense.expense_amount);

      if (categoryTotals[expense.expense_category]) {
        categoryTotals[expense.expense_category] += expenseAmount;
      } else {
        categoryTotals[expense.expense_category] = expenseAmount;
      }
    });

    const updatedLabels = Object.keys(categoryTotals);
    const updatedData = Object.values(categoryTotals);

    const updatedDatasets = [
      {
        label: 'Expenses in Peso',
        data: updatedData,
        backgroundColor: [
          'rgb(100, 210, 129)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
      },
    ];

    setChartData({
      labels: updatedLabels,
      datasets: updatedDatasets,
    });
  }, [savedExpense]);

  return (
    <>
      <div className= {!dark ? 'w-full md:col-span-1 relative lg:h-[35vh] h-[50vh] p-4 border rounded-lg bg-white ' : 'w-full md:col-span-1 relative lg:h-[35vh] h-[50vh] p-4  rounded-lg bg-[#272741] text-white'}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default PieChart;
