import React from 'react'
import NavBar from '../compnents/NavBar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import SentTable from '../compnents/SentTable'
import LoadingComponent from '../compnents/LoadingComponent'



const Sent = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState("");

  const id = localStorage.getItem('userId');
  useEffect(() => {
    axios.post('https://emailback-5jmh.onrender.com/fetchSentData', { id }).then(res => {
      if (res.status != 200) {
        console.log("Empty String")
        setLoading("false");
      } else {
        setLoading("false");
        setData(res.data)
      }
    })
  }, [])

  const styles = {
    main: {
      minHeight: "100vh",
      background: "url('img.jpg')",
      padding: "10px 10px",
      backgroundRepeat: "repeat"
    },
    h1: {
      color: "#fff",
      textAlign: "center"
    }
  }

  if (loading === "") {
    return (
      <LoadingComponent></LoadingComponent>
    )
  } else {
    return (
      <main style={styles.main}>
        <NavBar></NavBar>
        <br></br>
        <h1 style={styles.h1}>Sent</h1>
        <SentTable data={data}></SentTable>
      </main>
    )
  }
}


export default Sent
