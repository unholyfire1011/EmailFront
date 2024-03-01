import React from 'react';
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const params = new URLSearchParams(location.search)
  const username = params.get("userName")
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");

  const styles = {
    main:{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "url('img.jpg')",
      backgroundRepeat: "no-repeat"
    },
    wrapper:{
      width: "420px",
      background: "transparent",
      border: "2px solid rgba(255, 255, 255, .2)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      color: "#fff",
      borderRadius: "20px",
      padding: "30px 40px",
      margin: "10px 10px"
    },
    wrapperh1: {
        fontSize: "36px",
        textAlign: "center"
      },
      wrapperh5: {
        fontSize: "20px",
        textAlign: "center"
      },
      wrapperInputBox: {
        position: "relative",
        width: "100%",
        height: "50px",
        margin: "30px 0"
      },
  
      inputBoxInput: {
        width: "100%",
        height: "100%",
        background: "transparent",
        outline: "none",
        border: "2px solid rgba(255, 255, 255, .2)",
        borderRadius: "40px",
        fontSize: "16px",
        color: "#fff",
        padding: "20px 25px 20px 20px"
      },
      inputBoxI: {
        position: "absolute",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "20px"
      },
  
      wrapperbutton: {
        width: "100%",
        height: "45px",
        background: "#fff",
        border: "none",
        outline: "none",
        borderRadius: "40px",
        boxShadow: "0 0 10px  rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        fontSize: "16px",
        color: "#333",
        fontweight: "600"
      }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(password !== cpass){
        alert("Passwords Dont Match!!")
    }else{
        axios.post('https://emailback-ylq9.onrender.com/resetPass', {username,password}).then(res=>{
            if(res.status != 200){
                alert(res.data);
                Navigate("/");
            }else{
                alert(res.data);
                Navigate("/");
            }
        })
    }
  } 

  return (
    <body className='wrapper' style={styles.main}>
      <div style={styles.wrapper} className="wrapper">
      <form onSubmit={handleSubmit}>
          <h1 style={styles.wrapperh1}>SafeMail.</h1>
          <h5 style={styles.wrapperh1}> Forgot Password </h5>
          <div className='input-box' style={styles.wrapperInputBox}>
            <input type='mail' placeholder='Enter New Password' style={styles.inputBoxInput} onChange={(e)=>setPassword(e.target.value)} required></input>
            <i class='bx bxs-envelope' style={styles.inputBoxI}></i>
          </div>
          <div className='input-box' style={styles.wrapperInputBox}>
            <input type='mail' placeholder='Confirm Password' style={styles.inputBoxInput} onChange={(e)=>setCpass(e.target.value)} required></input>
            <i class='bx bxs-envelope' style={styles.inputBoxI}></i>
          </div>
          <button type='submit'  style={styles.wrapperbutton}>Submit</button>
       </form>
      </div>
    </body>
  )
}

export default ResetPassword
