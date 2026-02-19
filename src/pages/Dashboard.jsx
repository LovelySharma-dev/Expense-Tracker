import React, { useEffect,useState } from 'react'
import '../styles/Dashboard.css'
import { useNavigate } from 'react-router-dom';
import TransactionCards from '../components/TransactionCards';
import RecentTranactions from '../components/RecentTranactions';
import Notransaction from '../components/Notransaction';
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from "chart.js"

ChartJS.register(
  CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend
)

const Dashboard = () => {

  const navigate=useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const [categoryData, setCategoryData] = useState({});
  const [maxExpense, setMaxExpense] = useState(0);

  const categories = [
    "Salary",
    "Groceries",
    "Dining",
    "Transport",
    "Entertainment",
    "Others",
  ];

  useEffect(()=> {
    const existingTransactions=JSON.parse(localStorage.getItem('transactions')) || []
    setTransactions(existingTransactions)

    let income=0
    let expense=0
    let categoryBreakDown ={}
    let highestExpense = 0

    categories.forEach(cat=>categoryBreakDown[cat]=0)

    existingTransactions.forEach(tx => {
      if (tx.type=='Income') {
        income=income+tx.amount
      }
      else{
        expense+=tx.amount
        categoryBreakDown[tx.category] = (categoryBreakDown[tx.category] ||0)+tx.amount

        if (categoryBreakDown[tx.category] > highestExpense) {
          highestExpense = categoryBreakDown[tx.category]
        }
      }
    });


    setTotalIncome(income)
    setTotalExpense(expense)
    setBalance(income-expense)
    setCategoryData(categoryBreakDown)
    setMaxExpense(highestExpense)
  },[])

   const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses per Category",
        data: categories.map((cat) => categoryData[cat] || 0),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#9966FF",
          "#FFA07A",
        ],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: maxExpense > 0 ? maxExpense * 1.2 : 10,
        grid: {
          display: false, // Hide horizontal grid lines
        },
      },
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="dashboard">
      <div className="dashboard-inner">
        <h2>
          Dashboard
        </h2>
        <button className='add-transaction' onClick={() => navigate('/add-transaction')}>+ Add Transaction</button>
      </div>
      <TransactionCards balance={balance} income={totalIncome} expense={totalExpense} />


      <div className="transactions-chart-row">
        <div className="transactions half-width">
          <h3>Recent Transactions</h3>
          {transactions.length==0? <Notransaction/> : <RecentTranactions transactions={transactions}/>}
        </div>

         <div className="expense-chart half-width">
          <h3>Expense by Category</h3>
          {chartData.datasets[0].data.every((value) => value === 0) ? (<Notransaction/>) : 
          <div className='chart-container'>
            <Bar data={chartData} options={chartOptions}/>
          </div>
          
        
        }
           

        </div>
      </div>
    </div>
  )
}

export default Dashboard