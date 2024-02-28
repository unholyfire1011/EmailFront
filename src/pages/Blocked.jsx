import React from 'react'
import LoadingComponent from '../compnents/LoadingComponent'
import BlockedTable from '../compnents/BlockedTable'
import NavBar from '../compnents/NavBar'
import axios from 'axios'
import { useEffect, useState } from 'react'



const Blocked = () => {

    const [data, setData] = useState("");
    const [loading, setLoading] = useState("False")

    const id = localStorage.getItem('userId');
    useEffect(()=>{
      setLoading("");
      axios.post('https://emailback-5jmh.onrender.com/fetchBlockedData', {id}).then(res=>{
        if(res.status != 200){
          setLoading("False");
          console.log("Empty String");
        }else{
          setLoading("False");
          setData(res.data)
        }
      })
    }, [])

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

      if(loading === ""){
        return(
          <LoadingComponent></LoadingComponent>
        )
      }else{
        return (
          <main style={styles.main}>
            <NavBar></NavBar>
            <br></br>
            <h1 style={styles.h1}>Blocked</h1>
            <BlockedTable data={data}></BlockedTable>
          </main>
        )
      }
}

export default Blocked
