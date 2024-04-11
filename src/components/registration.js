import '../css/reg-css.css'
import React, { useState } from 'react'
import { authenticate, db } from '../firebase/setUp'
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router'

const Registration = () => {
  const navigate = useNavigate()
   const [userData,setUserData] = useState({
    username: '',
    email: '',
    password: '',
    phone:''
   })
   const [loginInfo,setLoginInfo] = useState({
    email: '',
    password: ''
   })
   const [isLoading,setIsLoading] = useState(false)

   const handleRegistration = e=>{
     e.preventDefault()
     setIsLoading(true)
    createUserWithEmailAndPassword(authenticate,userData.email,userData.password)
    .then(cred=>{
      const {password, ...others} = userData
      addDoc(collection(db,'users'),{...others,userId:cred.user.uid,balance:0.00})
      .then(userRef=>{
        getDoc(userRef).then(user=>{
          setIsLoading(false)
           navigate('/',{state:{userId:user.id}})
        })
        console.log('userCreated')})
      .catch(err=>{
        deleteUser(cred.user)
        .then(_=>console.log(err))
        .catch(err2=>console.log(err2))
      })
    })
    .catch(err=>{
      setIsLoading(false)
      console.log(err)
    })

   }
   const handleLogin = e=>{
    e.preventDefault()
    setIsLoading(true)
    signInWithEmailAndPassword(authenticate,loginInfo.email,loginInfo.password)
    .then(cred=>{
      getDocs(query(collection(db,'users'),where('userId','==', cred.user.uid)))
      .then(user=>{
        setIsLoading(false)
        navigate('/',{state:{userId:user.docs[0].id}})}
        )
      .catch(err2=>console.log(err2))
      console.log('success')
    })
    .catch(err=>{
      setIsLoading(false)
      console.log(err)
    })
   }
  return (
    <div className='reg-container'>
      <div className='welcome-info'>
        <h1 className='welcome-text'>Hello, Welcome to Best Global Savings.<br/><span className='login-text'>Login</span> or <span className='signup-text'>Sign up</span></h1>

      </div>
    <div className="main">  	
		<input type="checkbox" id="chk" aria-hidden="true"/>

			<div className="signup">
				<form onSubmit={handleRegistration}>
					<label htmlFor="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="txt" placeholder="User name" onChange={(e)=>setUserData(prev=>({...prev,username:e.target.value}))} required=""/>
					<input type="text" name="txt" placeholder="Phone number" onChange={(e)=>setUserData(prev=>({...prev,phone:e.target.value}))} required=""/>
					<input type="email" name="email" placeholder="Email" onChange={(e)=>setUserData(prev=>({...prev,email:e.target.value}))} required=""/>
					<input type="password" name="pswd" placeholder="Password" onChange={(e)=>setUserData(prev=>({...prev,password:e.target.value}))} required=""/>
					<button className='submit-btn'>{!isLoading?"Sign up":<div className='loader'></div>}</button>
				</form>
			</div>

			<div className="login">
				<form onSubmit={handleLogin}>
					<label htmlFor="chk" aria-hidden="true">Login</label>
					<input type="email" name="email" placeholder="Email" onChange={(e)=>setLoginInfo(prev=>({...prev,email:e.target.value}))} required=""/>
					<input type="password" name="pswd" placeholder="Password" onChange={(e)=>setLoginInfo(prev=>({...prev,password:e.target.value}))} required=""/>
					<button className='submit-btn'>{!isLoading?"Login":<div className='loader'></div>}</button>
				</form>
			</div>
	</div>
  </div>
  )
}

export default Registration