import React from 'react'
import NavBar from '../compnents/NavBar'
import SpamTable from '../compnents/SpamTable'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingComponent from '../compnents/LoadingComponent'

const Spam = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState("");

  const id = localStorage.getItem('userId');

  useEffect(() => {
    axios.post('https://emailback-5jmh.onrender.com/fetchSpamData', { id }).then(res => {
      if (res.status != 200) {
        console.log("Empty String")
        setLoading("false");
      } else {
        setData(res.data);
        setLoading("false");
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
        <h1 style={styles.h1}>Spam</h1>
        <SpamTable data={data}></SpamTable>
      </main>
    )
  }
}

export default Spam
