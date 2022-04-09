import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Layout from './navbar'

const Alert = (props)=>{
  return(
    <label style={{display:props.isDisplayAlert, color:"red", marginLeft:"30%"}} >
    <b>{props.alertt}</b></label>

  )
}

const Login = () => {
  const [name, setname] = useState("")
  const [phone  , setPhone] = useState("")

  const [alertt,setAlertt] = useState("")
  const [isDisplayAlert, setisDisplayAlert] = useState("none")

  let navigate = useNavigate(); 
  const routeChange = (path) =>{ 
     
    navigate(path);
  }
  const handleSubmit =(event)=>{
event.preventDefault()

fetch('http://localhost:3000/login-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"user":{"name":name,"phone":phone}}),
  })
  .then((response) => (response.json()))
  //Then with the data from the response in JSON...
  .then((data) => {
    if(data.isVerif === true){
      routeChange(`/home/${data.id}`)
    }
    else{
      setisDisplayAlert("block")
      setAlertt("Please sign up to continue")
    }
    console.log('Success:', data);
  })
  //Then with the error genereted...
  .catch((error) => {
    setisDisplayAlert("block")
      setAlertt("Could not log in. Please try again later")
  });

  }
  return (
    <div className="container">
        <Layout isSignUp = "block" isSignIn = "none" isSignOut = "none"/>

    <h1>Login</h1>
    <hr/>
    <form onSubmit={handleSubmit}>
    <label ><b>Name</b></label>
    <input type="text" value={name} placeholder="Enter Name" name="name" required onChange={(e)=>{setname(e.target.value)}}/>
<br />
    <label ><b>Phone number</b></label>
    <input type="text" value={phone} placeholder="Enter Phone number" name="phone" required onChange={(e)=>{setPhone(e.target.value)}}/>

  
    
    
    <Alert alertt = {alertt} isDisplayAlert = {isDisplayAlert}/>

    <div className="clearfix">
      <button type="submit" className="Loginbtn">Login</button>
    </div>
  </form>

  </div>
  )
}

export default Login