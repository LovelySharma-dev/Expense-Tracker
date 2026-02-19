import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Report from './pages/Report'
import Transaction from './pages/Transaction'
import Navbar from './components/Navbar'
import NotFound from './pages/NotFound'
import AddTransaction from './pages/AddTransaction'

const App = () => {
  return (
      <div>
        <Navbar/>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/reports' element={<Report/>}/>
        <Route path='/transaction' element={<Transaction/>} />
        <Route path='/add-transaction' element={<AddTransaction/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
      
    </div>
  )
}

export default App