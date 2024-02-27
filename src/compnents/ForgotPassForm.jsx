import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'




const ForgotPassForm = () => {

  const [username, setUsername] = useState("");
  const Navigate = useNavigate();

  const styles = {
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
    axios.post('https://emailback-5jmh.onrender.com/forgotPass', {username}).then(res=>{
      alert(res.data);
      Navigate('/');
    })
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <h1 style={styles.wrapperh1}>SafeMail.</h1>
          <h5 style={styles.wrapperh1}> Forgot Password </h5>
          <div className='input-box' style={styles.wrapperInputBox}>
            <input type='mail' placeholder='Enter The Registed Email-Id' style={styles.inputBoxInput} onChange={(e)=> setUsername(e.target.value)} required></input>
            <i class='bx bxs-envelope' style={styles.inputBoxI}></i>
          </div>
          <button type='submit'  style={styles.wrapperbutton}>Submit</button>
       </form>
    </div>
  )
}

export default ForgotPassForm
