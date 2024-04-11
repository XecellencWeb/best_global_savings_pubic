import React, { useState } from 'react'
import {PaystackButton} from 'react-paystack'
import { publicKey, saveCharges } from '../paystack/dependencies'
import { updateDoc } from 'firebase/firestore'
import { showtypes } from '../constants/variables'



const Payment = ({offPopup,user,setUser,userRef})=>{
    const [amount,setAmount] = useState(0)
    const payerDetails = {
        email:user?.email,
        metadata: {
          name:user?.username,
          phone:user?.phone,
        },
        publicKey,
        text: "Save Money",
        onSuccess: () =>{
           userRef && updateDoc(userRef,{
                balance: user.balance + amount/100
            }).then(_=>console.log('success'))
            setUser(prev=>({...prev,balance:prev.balance + amount/100}))
            offPopup(false)
        },
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
      }


    return <div className='popup-box' onClick={(e=>{
        e.stopPropagation()
        offPopup(true)
        })}>
        <input className='full-input' type='number' placeholder='Enter amount to add' onChange={(e)=>setAmount(parseInt(e.target.value)*100)}/>
        <PaystackButton {...payerDetails} amount={amount + saveCharges}/>
    </div>
}

const list = [
    ['Register to get your wallet',true],
    ['Add money to wallet',true],
    ['Set withdraw date',false],
]

const RemainingList = ({offPopup,setType})=>{

    const functions = {
        0:()=>{},
        1:()=>{},
        2:()=>{setType(showtypes.w)}
    }
    return <div className='popup-box' onClick={(e=>{
        e.stopPropagation()
        offPopup(true)
        })}>
        <div className='remaining-list'>
            {
                list?.map((item,i)=>(<p key={i} onClick={!item[1] && functions[i] } className={`list ${item[1]?'marked':'not-marked'}`} style={{'--number':i}}>{item[0]}<br/></p>))
            }
        </div>
    </div>
}

const SetWithdrawTime = ({offPopup})=>{
    return <div className='popup-box' onClick={(e=>{
        e.stopPropagation()
        offPopup(true)
        })}> 
        <div className='time-div'>
        <div className='info-div'>
            <h2 className='date-header'>Choose when to withdraw your now savings.</h2>
            <p className='note-text'>note: you can't reset after you set one.</p>

           <div className='choose-date'>
            <input placeholder='example 6...' type='number' min={3}/>
            <select className='select-period'>
                <option>months</option>
                <option>years</option>
            </select>
            </div>
           <button className='choose-button'>Set Time</button>
        </div>
        <div className='loading-div'>
            <div className='dotted-spinner'></div>
        </div>
        </div>
    </div>
}

const Popup = ({offPopup,user,setUser,userRef,type,setType}) => {
    const PaymentProps = {offPopup,user,setUser,userRef}
    const ListProps = {offPopup,setType}
    const WidthProps = {offPopup}
  return (
    <div className='popup-environ' onClick={(e=>offPopup(false))}>
        {type === showtypes.p && <Payment {...PaymentProps}/>}
        {type === showtypes.r && <RemainingList {...ListProps}/>}
        {type === showtypes.w && <SetWithdrawTime {...WidthProps}/>}
    </div>
  )
}

export default Popup