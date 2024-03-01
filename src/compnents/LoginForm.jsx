import React from 'react'
import LoadingComponent from './LoadingComponent';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'


const LoginForm = ({ children }) => {
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState("False");
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

    wrapperrememberforgot: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14.5px",
      margin: "-15px 0 15px"
    },

    rememberforgotlabelinput: {
      accentColor: "#fff"
    },


    rememberforgota: {
      color: "#fff",
      textDecoration: "none"
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

    wrapperregisterlink: {
      fontSize: "14.5px",
      textAlign: "center",
      marginTop: "20px"
    },

    registerlinkpa: {
      color: "#fff",
      textDecoration: "none",
      fonWeight: "600"
    }
  }


  

  useEffect(() => {

    const storedUsername = localStorage.getItem('rememberedUsername');
    if (storedUsername) {
      setUname(storedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (event) => {
    setLoading("");
    event.preventDefault();
    axios.post('https://emailback-ylq9.onrender.com/login', { uname, pass }).then(res => {
      if (res.status != 200) {
        alert(res.data)
        setLoading("False");
      } else {
        if (rememberMe) {
          localStorage.setItem('rememberedUsername', uname);
        } else {
          localStorage.removeItem('rememberedUsername');
        }
        setLoading("False");
        const id = res.data;
        localStorage.setItem('userId', id)
        Navigate('/inbox');
      }
    })
  }
  
  if(loading === ""){
    return(
      <LoadingComponent></LoadingComponent>
    )
  }else{
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h1 style={styles.wrapperh1}>SafeMail.</h1>
          <h5 style={styles.wrapperh5}>Login</h5>
          <div className='input-box' style={styles.wrapperInputBox}>
            <input type='text' style={styles.inputBoxInput} placeholder='Registered Email Id' value={uname} onChange={(e) => setUname(e.target.value)} required></input>
            <i class='bx bxs-user' style={styles.inputBoxI}></i>
          </div>
          <div className='input-box' style={styles.wrapperInputBox}>
            <input type='password' style={styles.inputBoxInput} placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)} required></input>
            <i class='bx bxs-lock-alt ' style={styles.inputBoxI}></i>
          </div>
          <div className='remember-forgot' style={styles.wrapperrememberforgot}>
            <label>
              <input type="checkbox" style={styles.rememberforgotlabelinput} checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />Remember me?
            </label>
            <a style={styles.rememberforgota}><Link to="/forgot-password">Forgot Password</Link></a>
          </div>
          <button type='submit' className='button' style={styles.wrapperbutton}>Submit</button>
          <div className="register-link" style={styles.wrapperregisterlink}>
            <p style={styles.registerlinkpa}>Don't have an account? <Link to='/register'>Register</Link></p>
          </div>
        </form>
      </div>
    )

  }
}

export default LoginForm
