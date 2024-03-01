import React from 'react'
import NavBar from '../compnents/NavBar'
import Table from '../compnents/table'
import { useEffect, useState } from 'react'
import LoadingComponent from '../compnents/LoadingComponent'
import axios from 'axios'

const Inbox = () => {

  const [data, setData] = useState("");
  const [content, setContent] = useState("");
  const [loading, isLoading] = useState(null);

  const styles = {
    main:{
      minHeight: "100vh",
      background: "url('img.jpg')",
      padding: "10px 10px",
      backgroundRepeat: "repeat"
      
    },
    h1:{
      color: "#fff",
      textAlign: "center"
    }
  }  

  const id = localStorage.getItem('userId');
  
  useEffect(()=>{
    axios.post('https://emailback-ylq9.onrender.com/fetchData', {id}).then(res=>{
      if(res.status != 200){
        console.log("Empty String")
        isLoading("false");
      }else{
        setData(res.data)
        isLoading("false");
      }
    })
  }, [])

  let c;


  if(loading == null){
    return( <LoadingComponent></LoadingComponent> )
  }else{
  return (
    <main style={styles.main}>
    <NavBar></NavBar>
    <br></br>
    <h1 style={styles.h1}>Inbox</h1>
    <Table data={data}></Table>
  </main>
  )
}
}

export default Inbox
