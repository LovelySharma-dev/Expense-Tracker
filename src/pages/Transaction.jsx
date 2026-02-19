import React, { useEffect, useState } from 'react'
import '../styles/Transaction.css'
import { useNavigate } from 'react-router-dom'
import Notransaction from '../components/Notransaction'

const Transaction = () => {
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState([])

    const categoryEmojis = {
    Salary: "💰",
    Groceries: "🛒",
    Dining: "🍽",
    Transport: "🚗",
    Entertainment: "🎭",
    Others: "📝",
  };

  useEffect(()=>{
    const existingTransactions= JSON.parse(localStorage.getItem('transactions')) || []

    setTransaction(existingTransactions)
  },[])

  function handleEdit(index) {
    const editTransactions = transaction[index]
    navigate('/add-transaction',{
      state: { transaction: {...editTransactions, index}}
    })
  }

  function handleDelete(index) {
    const updatedTransactions=transaction.filter((data, i) => i!==index)
    setTransaction(updatedTransactions)
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions))
  }
  return (
    <div className="transactions-container">
       <h2>All Transactions</h2>
       {transaction.length==0? <Notransaction/> : 
       <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((tx, index) => (
            <tr key={index}>
              <td> {categoryEmojis[tx.category]} {tx.category} </td>
              <td> {tx.description || "No Description"} </td>
              <td className={tx.type == "Income" ? "income" : "expense"}>
                {tx.amount.toLocaleString('en-In', {
                  style: 'currency',
                  currency: 'INR'
                })}
              </td>
              <td> {tx.date} </td>
              <td> {tx.type} </td>
              <td>
                <div className="action-buttons">
                  <button onClick={() => handleEdit(index)} className='edit-btn'>✏️ Edit</button>
                  <button onClick={() => handleDelete(index)} className='delete-btn'>🗑️ Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
       </table>

        }
    </div>


  )
}

export default Transaction