import React, { useState } from 'react'
import Layout from './navbar'
import { useNavigate } from "react-router-dom";

const Alert = (props)=>{
  return(
    <label style={{display:props.isDisplayAlert, color:"blue", marginLeft:"30%"}} >
    <b>{props.alertt}</b></label>

  )
}


const Homepage = () => {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/`; 
      navigate(path);
    }

    window.onload = ()=>{
       
        let str = window.location.href
        let i = str.indexOf("/home")
        let sub_str = str.substring(i)
        console.log(sub_str.substring(6))
    
        fetch('http://localhost:3000/verify-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"user":{"id":sub_str.substring(6)}}),
        })
        .then((response) => (response.json()))
        //Then with the data from the response in JSON...
        .then((data) => {
          if(data.isVerif == false){
            
            routeChange()
      
          }
        })
        //Then with the error genereted...
        .catch((error) => {
          console.log('Error:', error);
        });
    
    }
    let str = window.location.href
        let i = str.indexOf("/home")
        let sub_str = str.substring(i)
    const [amount,setAmount] = useState(0)
    const [upi,setUpi] = useState("")
    const [reason,setReason] = useState("")
    const [duration,setDuration] = useState(0)
    const [alertt,setAlertt] = useState("")
    const [isDisplayAlert, setisDisplayAlert] = useState("none")
const handleSubmit = (e)=>{
    e.preventDefault()
    if(amount !== 0 && reason !== "" && duration !==0 && upi !== ""){
    fetch('http://localhost:3000/borrow-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"user":{"id":sub_str.substring(6),"amount":amount,"reason":reason,
    "duration":duration,"upi":upi}}),
    })
    .then((response) => (response.json()))
    //Then with the data from the response in JSON...
    .then((data) => {
      if(data.isSaved === true){
        setisDisplayAlert("block")
        setAlertt("Your request has been sent")
      }
    })
    //Then with the error genereted...
    .catch((error) => {
      setisDisplayAlert("block")
        setAlertt("Your request could not be placed due to some error. Please try again later")
    });
  }
}
    return (
        <div className="container">
        <Layout isSignUp = "none" isSignIn = "none" isSignOut = "block"/>
        <h1>Borrow Request Screen</h1>
        <p>Please fill in this form to add a borrow request.</p>
        <hr/>
        <form onSubmit={handleSubmit}>
        <label ><b>Amount</b></label><br />
        <input type="number" value={amount} placeholder="Enter Amount" name="amount" required onChange={(e)=>{setAmount(e.target.value)}}/>
        
    <br /><br />
        <label ><b>Reason</b></label><br />
        <input type="text" value={reason} placeholder="Enter Reason" name="reason" required onChange={(e)=>{setReason(e.target.value)}}/>
    <br />
       <label ><b>Duration (in days)</b></label><br />
        <input type="number" value={duration}  name="duration" required onChange={(e)=>{setDuration(e.target.value)}}/>
        <br /><br />
        <label ><b>UPI ID</b></label><br />
        <input type="text" value={upi} placeholder="Enter UPI ID" name="upi" required onChange={(e)=>{setUpi(e.target.value)}}/>
        <Alert alertt = {alertt} isDisplayAlert = {isDisplayAlert}/>
    
        <div className="clearfix">
      <button type="submit" className="signupbtn">Submit Request</button>
    </div>

      </form>
    
      </div>
      )
}

export default Homepage