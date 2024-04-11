import '../css/dashboard.css'
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router'
import Popup from './Popup'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/setUp'
import { showtypes } from '../constants/variables'


const MainPage = () => {
 const [showPopup,setShowPopup] = useState(false)
 const [showType,setType] = useState(null)
  const {state} = useLocation()
  const userId = state?.userId
  const userRef =userId && doc(db,'users',userId)
  const [user,setUser] = useState(null)
   useEffect(()=>{
     userRef && getDoc(userRef)
      .then(user=>setUser(user.data()))
   },[])
  return (
    <>
     {!userId && <Navigate to='/registration'/>}
    {showPopup && <Popup offPopup={setShowPopup} user={user} setUser={setUser} userRef={userRef} type={showType} setType={setType}/>}
    <div className="profile-card">
  <header>
    <a target="_blank" href="/">
      <img src="http://lor= empixel.com/150/150/people/" className="hoverZoomLink" alt=''/>
    </a>
    <h1 className='name'>{user?.username}</h1>
    <h2 className='balance'>Savings: {user?.balance?.toLocaleString('en-NG',
      {
      currency:'NGN',
      style:'currency'
      })}</h2>

  </header>
  <div className='remaining-cont'><p onClick={()=>{
    setShowPopup(true)
    setType(showtypes.r)
    }} className='steps-remaining'>1 step remaining to complete setup.</p></div>
  <button onClick={()=>{
    setShowPopup(true)
    setType(showtypes.p)
    }} className='aqua'>
      <span>
        <span className='orange'>+</span> Add Money
      </span>
    </button>
  <button onClick={()=>{
    setShowPopup(true)
    setType(showtypes.w)
    }} className='aqua'>
      <span>
      <span className='orange'>&rarr;</span> Set Withdraw Date
      </span>
    </button>
</div>
</>
  )
}

export default MainPage