import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Layout from './navbar'



const SubmitButton = (props)=>{
  return (
    <div className="clearfix">
      <button type="submit" className="signupbtn">{props.text}</button>
    </div>
  )
}
const AlertLabel = (props)=>{
  return(
    <label style={{display:props.isDisplayAlert, color:"red", marginLeft:"30%"}} >
    <b>{props.alertt}</b></label>

  )
}


const Signup = () => {
  let navigate = useNavigate(); 
  const routeChange = (path) =>{ 
    navigate(path);
  }
  const [otp, setOtp] = useState("")
const [isDisplayAlert, setIsDisplayAlert] = useState("none")
const [alertt,setAlertt] = useState("")
  const [isDisplay, setisDisplay] = useState("none")
  const [text, setText] = useState("Sign Up")
  const [namee, setName] = useState("")
  const [phone  , setPhone] = useState("")
  const [gender, setGender] = useState("")

  const handleSubmit =(event)=>{
event.preventDefault()
setIsDisplayAlert("none")
// alert(`You entered ${email} ${phone} ${gender}`)
// console.log(email,phone,gender)
if(isDisplay === "none"){
  let letters = /^[A-Za-z\s]*$/;
  if(phone.length !== 10 || letters.test(phone) || gender === '' || !letters.test(namee)){
    setIsDisplayAlert("block")
    setAlertt("Invalid credentials")
  }
  
  else{

  fetch('http://localhost:3000/register-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"user":{"name":namee,"phone":phone,"gender":gender,"otp":otp}}),
  })
  .then((response) => (response.json()))
  //Then with the data from the response in JSON...
  .then((data) => {
    if(data.otp_sent === true){
      setisDisplay("block")
      setText("Verify")
    }
    else if(data.already_verified === true){
      setIsDisplayAlert("block")
      setAlertt("User exists. Please log in to continue")
    }
    console.log('Success:', data);
  })
  //Then with the error genereted...
  .catch((error) => {
    setIsDisplayAlert("block")
      setAlertt("Could not sign up due to some errors faced. Please try again later")
  });
}
}
else{
  
  console.log("isdisplay is block")

  fetch('http://localhost:3000/verify-otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"user":{"name":namee,"phone":phone,"gender":gender,"otp":otp}}),
  })
  .then((response) => (response.json()))
  
  .then((data) => {
    if(data.isVerify === true){

      routeChange(`/home/${data.id}`)

    }
    else{
      setIsDisplayAlert("block")
      setAlertt("Incorrect OTP")
    }
  })
  //Then with the error genereted...
  .catch((error) => {
    setIsDisplayAlert("block")
      setAlertt("Could not sign up due to some errors faced. Please try again later")
  });
}


  }
  return (
    <div className="container">
        <Layout isSignUp = "none" isSignIn = "block" isSignOut = "none"/>

    <h1>Sign Up</h1>
    <p>Please fill in this form to create an account.</p>
    <hr/>
    <form onSubmit={handleSubmit}>
    <label ><b>Name</b></label>
    <input type="text" value={namee} placeholder="Enter Name" name="name" required onChange={(e)=>{setName(e.target.value)}}/>
    <label ><b>Gender</b></label>
    <input type="radio" name="gender" value="Male" onClick={(e)=>setGender(e.target.value)} />Male
    <input type="radio" name="gender" value="Female" onClick={(e)=>setGender(e.target.value)} />Female
<br /><br />
    <label ><b>Phone number</b></label>
    <input type="text" value={phone} placeholder="Enter Phone number" name="phone" required onChange={(e)=>{setPhone(e.target.value)}}/>

    <label style={{display:isDisplay}} ><b>OTP</b></label>
  

    <input type="text" value={otp} onChange = {(e)=>setOtp(e.target.value)}
      style={{display:isDisplay}}
    ></input>
    
    <AlertLabel alertt = {alertt} isDisplayAlert = {isDisplayAlert}/>

    <SubmitButton text = {text}/>

  </form>

  </div>
  )
}

export default Signup