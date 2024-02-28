import React from 'react'
import SendMail from '../compnents/SendMail'
import NavBar from '../compnents/NavBar'


const NewMail = () => {

    const styles = {
        main: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        },
        wrapper: {
            background: "url('img.jpg')",
            backgroundRepeat: "no-repeat",
            paddingBottom: '2vh'
        },
        h1: {
            color: "#fff",
            textAlign: "center"
        },
        Nav:{
            marginTop: '2vh'
        }
    }
    return (
        <div style={styles.wrapper}>

        <main style={styles.main}>    
        <div className='newWrapper'>
          <SendMail></SendMail>
        </div> 
      </main>
        </div>
    )
}

export default NewMail
