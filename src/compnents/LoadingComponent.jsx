import React from 'react'
import ReactLoading from "react-loading";

const LoadingComponent = () => {
  const styles = {
    main:{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "url('img.jpg')",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh"
    },
    heading: {
      color: "#fff"
    }
  }
  return (
    <body style={styles.main}>
      <div className="wrapper">
        <div>
          <ReactLoading type="spin" color="#fff" />
           <br />
           <h6 style={styles.heading}>Loading...</h6>
         </div>
      </div>
    </body>
  )
}

export default LoadingComponent
