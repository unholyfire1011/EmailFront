import React from 'react'
import ForgotPassForm from '../compnents/ForgotPassForm'


const ForgotPass = () => {
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
    }
  }
  return (
    <body className='wrapper' style={styles.main}>
      <div style={styles.wrapper} className="wrapper">
        <ForgotPassForm></ForgotPassForm>
      </div>
    </body>
  )
}

export default ForgotPass
