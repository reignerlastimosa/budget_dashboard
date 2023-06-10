import '@/styles/globals.css';
import Sidebar from '../components/Sidebar';
import { useState, useEffect } from 'react';
export default function App({ Component, pageProps }) {

  const[dark,setDark] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const[dashboardValues, setDashboardValues] = useState({})
  const [dashboardBalance, setDashboardBalance] = useState('');
  useEffect(()=>{
    let existingData = localStorage.getItem('dashboard_values');

    if(existingData){
        setDashboardValues(existingData);
        
    }
});

useEffect(()=>{
  setDark(false);
},[]);

const [savedExpense, setSavedExpense] = useState([]);
  
useEffect(() => {
  const savedData = JSON.parse(localStorage.getItem('financeData'));

  if (savedData) {
    setSavedExpense(savedData);
  }
}, []);

  return (
    <Sidebar dark={dark} setDark ={setDark}>
      <Component dark={dark} setDark ={setDark} {...pageProps} showComponent={showComponent} setShowComponent={setShowComponent} dashboardValues={dashboardValues} setDashboardValues={setDashboardValues} savedExpense={savedExpense} setSavedExpense={setSavedExpense} dashboardBalance={dashboardBalance} setDashboardBalance={setDashboardBalance}/>
    </Sidebar>
  );
}