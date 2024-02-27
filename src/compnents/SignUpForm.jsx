import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUpForm = () => {

  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");


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
    },

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pass != cpass) {
      alert("password's dont match!");
      return;
    } else {
      axios.post('https://emailback-5jmh.onrender.com/register', { name, mail, pass }).then(res => {
        alert(res.data);
        Navigate('/');
      }).catch(err => {
        alert(err);
        Navigate('/');
      })
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <h1 style={styles.wrapperh1}>SafeMail.</h1>
      <h5 style={styles.wrapperh5}> Register </h5>
      <div className='input-box' style={styles.wrapperInputBox}>
        <input type='text' style={styles.inputBoxInput} placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required></input>
        <i class='bx bxs-user' style={styles.inputBoxI}></i>
      </div>
      <div className='input-box' style={styles.wrapperInputBox}>
        <input type='mail' style={styles.inputBoxInput} placeholder='Email' value={mail} onChange={(e) => setMail(e.target.value)} required></input>
        <i class='bx bxs-envelope' style={styles.inputBoxI}></i>
      </div>
      <div className='input-box' style={styles.wrapperInputBox}>
        <input type='password' style={styles.inputBoxInput} placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)} required></input>
        <i class='bx bx-lock-alt' style={styles.inputBoxI}></i>
      </div>
      <div className='input-box' style={styles.wrapperInputBox}>
        <input type='password' style={styles.inputBoxInput} placeholder='Confirm Password' value={cpass} onChange={(e) => setCpass(e.target.value)} required></input>
        <i class='bx bx-lock-alt' style={styles.inputBoxI}></i>
      </div>
      <button type='submit' style={styles.wrapperbutton} className='button'>Submit</button>
    </form>
  )
}

export default SignUpForm
