import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
const Navbar = () => {
    
    const location = useLocation()
    const [quote, setQuote] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchQuote = async() => {
      try {
      const response = await fetch('https://dummyjson.com/quotes/random')
      const data = await response.json()
     setQuote(data.quote)
      setIsModalOpen(true)
      } catch (error) {
        console.log(error);
        
      }
    }

    const navigation = useNavigate()
    const handleReset = () => {
      localStorage.clear()
      navigation('/')
    }
  return (
    <div className='navbar'>
        <h1 className='logo'>Expense Tracker</h1>
        <ul className='nav-links'>
            <li className= {location.pathname==='/' ? 'active' : ''} ><Link to={'/'} >📊 Dashboard</Link></li>
            <li className= {location.pathname==='/transaction' ? 'active' : ''} ><Link to={'/transaction'} >📄 Transaction</Link> </li>
            <li className= {location.pathname==='/reports' ? 'active' : ''} ><Link to={'/reports'}>⌛ Reports</Link></li>

            <li>
              <div className="quote-btn" onClick={fetchQuote}>💡 Get Quote</div>
            </li>
            <li > <div className="reset-btn" onClick={handleReset}>🔁 Reset</div> </li>
        </ul>

        {
          isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <p> {quote}</p>
                <button className='cls-btn' onClick={()=>setIsModalOpen(false)}>Close</button>
              </div>
            </div>
          )
        }
    </div>
  )
}

export default Navbar