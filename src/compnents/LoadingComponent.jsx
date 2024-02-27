import React from 'react'
import ReactLoading from "react-loading";

const LoadingComponent = () => {
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
      
      background: "transparent",
      border: "2px solid rgba(255, 255, 255, .2)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      color: "#fff",
      borderRadius: "20px",
      padding: "30px 40px",
      margin: "10px 10px"
    }
  }
  return (
    <body style={styles.main}>
      <div style={styles.wrapper} className="wrapper">
        <div>
          <ReactLoading type="spin" color="#fff" />
           <br />
           <h6>Loading...</h6>
         </div>
      </div>
    </body>
  )
}

export default LoadingComponent
