import React from 'react'
import LoadingComponent from './LoadingComponent'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CryptoJS from "crypto-js"


const SendMail = () => {

  const id = localStorage.getItem('userId');
  
  const Navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading ] = useState("False")


  useEffect(()=> {
    setLoading("");
    axios.post('https://emailback-5jmh.onrender.com/getUser', {id}).then(res=>{
      setLoading("False");
      setFrom(res.data.mail);
    })
  }, [])


  const styles = {
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

    inputTextArea: {
      width: "100%",
      height: "30vh",
      background: "transparent",
      outline: "none",
      border: "2px solid rgba(255, 255, 255, .2)",
      borderRadius: "10px",
      fontSize: "16px",
      color: "#fff",
      zIndex: "5",
      resize: "none"
    },

    wrapperbutton: {
      width: "100%",
      background: "#fff",
      border: "none",
      outline: "none",
      borderRadius: "40px",
      boxShadow: "0 0 10px  rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      fontSize: "16px",
      color: "#333",
      fontweight: "600",
      marginTop: "25vh",
      height: "30px"
    }
  }

  const secretPass = "XkhZG4fW2t2W";

  const encryptData = (msg) => {
    const edata = CryptoJS.AES.encrypt(msg, '12345').toString();
    return edata;
  };



  const handleSubmit = (event) => {
    setLoading("");
    event.preventDefault();
    const encryptedData = encryptData(msg);
    const formData = new FormData();
    formData.append('from',from);
    formData.append('to', to);
    formData.append('encryptedData', encryptedData);
    formData.append('file',file);

    axios.post('http://localhost:3001/sendMsg', formData).then(res=>{
        if(res.status == 200){
          setLoading("False");
          alert(res.data);
          Navigate('/sent');
        }else{
          setLoading("False");
          alert(res.data);
          Navigate('/inbox');
        }
    })
}

const handleFile = (event) => {

  const f  = event.target.files[0];
  setFile(f);
  var allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(f.type)) {
    alert('Invalid file type. Please upload a JPEG, PNG');
    location.replace(location.href);
 }
}

  if (loading === ""){
    return(
      <LoadingComponent></LoadingComponent>
    )
  }else{
    return (
      <div style={styles.div} id="sentDiv">
        <form onSubmit={handleSubmit}  encType="multipart/form-data">
        <h5 style={styles.wrapperh5}> Send Mail </h5>
        <div className='input-box' style={styles.wrapperInputBox}>
          <input type='text' style={styles.inputBoxInput} value={from}  readOnly></input>
          <i class='bx bxs-user' style={styles.inputBoxI}></i>
        </div>
        <div className='input-box' style={styles.wrapperInputBox}>
          <input type='mail' style={styles.inputBoxInput} placeholder='TO:' value={to} onChange={(e) => setTo(e.target.value)} required></input>
          <i class='bx bxs-envelope' style={styles.inputBoxI}></i>
        </div>
          <input type='file' style={styles.inputBoxInput} accept="image/png, image/jpeg" onChange={handleFile}></input>
          <h6>* Enter a single image(.png, .jpeg) file only</h6>
        <div className='input-box' style={styles.wrapperInputBox}>
          <textarea name="paragraph_text" className='inputTextArea' value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='Enter Your Message Here' style={styles.inputTextArea} required></textarea>
        </div>
        <div>
        <button type='submit' style={styles.wrapperbutton} className='button'>Submit</button>
        </div>
      </form>
      </div>
    ) 
  }
}

export default SendMail
