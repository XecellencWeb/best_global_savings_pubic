import './App.css'


import React, { useEffect, useState } from 'react'
import Registration from './components/registration'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import MainPage from './components/MainPage'
import Login from './components/Login'
import { authenticate } from './firebase/setUp'
import { onAuthStateChanged } from 'firebase/auth'

const App = () => {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/registration' element={<Registration/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App