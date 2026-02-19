import React from 'react'

const RecentTranactions = ({transactions}) => {

    const categoryEmojis = {
    Salary: "💰",
    Groceries: "🛒",
    Dining: "🍽",
    Transport: "🚗",
    Entertainment: "🎭",
    Others: "📝",
  };
  return (
    <>
    {transactions.slice(-8).reverse().map((tx, index)=>(
        <li key={index} className='transaction-item'>
            <span className='transaction-category' >
                {categoryEmojis[tx.category]} {tx.category}
            </span>
            <span className={`transaction-amount ${tx.type === 'Income' ? 'income' : 'expense'}`} > ₹{tx.amount.toLocaleString()} </span>
        </li>
    ))}
    </>
  )
}

export default RecentTranactions