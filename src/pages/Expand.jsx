import React, { useState } from 'react'
import LoadingComponent from '../compnents/LoadingComponent'
import NavBar from '../compnents/NavBar';
import CryptoJS from 'crypto-js'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'




const secretKey = '12345';

const Expand = () => {

  const [loading, setLoading] = useState("False");
  const Navigate = useNavigate();
  const userId = localStorage.getItem('userId');



  const handleSpam = (event, msgId, date, from, msg, file) => {
    setLoading("");
    axios.post('https://emailback-ylq9.onrender.com/spam', { userId, msgId, date, from, msg, file })
      .then(res => {
        if (res.status !== 200) {
          setLoading("False");
          alert(`Error: ${res.data}`);
        } else {
          setLoading("False");
          alert(`Success: ${res.data}`);
          Navigate('/spam');
        }
      })
      .catch(err => {
        setLoading("False");
        alert("Could Not Add to Spam!! Try Again After Sometime");
      });
  }

  const handleDelete = (event, id, file) => {
    setLoading("");
    axios.post('https://emailback-ylq9.onrender.com/deleteMsg', { id, userId, file }).then(res => {
      if (res.status !== 200) {
        setLoading("False");
        alert(res.data)
      } else {
        setLoading("False");
        alert(res.data);
        Navigate('/inbox');
      }
    }).catch(err => {
      setLoading("False");
      alert('Could not delete the message due to technical error!! please try again after some time')
    })
  }


  const handleBlock = (event, from, id) => {
    setLoading("");
    axios.post('https://emailback-ylq9.onrender.com/blockUser', { userId, from, id }).then(res => {
      if (res.status != 200) {
        setLoading("False");
        alert(res.data);
      } else {
        setLoading("False");
        alert(res.data);
        Navigate('/blocked');
      }
    })
  }


  const handleSpamDelete = (event, id) => {
    setLoading("");
    const userId = localStorage.getItem('userId');
    axios.post('https://emailback-ylq9.onrender.com/deleteMsgSpam', { id, userId }).then(res => {
      if (res.status != 200) {
        setLoading("False");
        alert(res.data);
        Navigate('/inbox');
      } else {
        setLoading("False");
        alert(res.data);
        Navigate('/inbox');
      }
    }).catch(err => {
      alert('Could not delete the message due to technical error!! please try again after some time');
      setLoading("False");
    })
  }


  function handleRestore(event, itemId, date, from, msg, file) {
    setLoading("");
    const userId = localStorage.getItem('userId');
    axios.post('https://emailback-ylq9.onrender.com/restore', { userId, date, from, msg, itemId, file }).then(res => {
      if (res.status != 200) {
        setLoading("False");
        alert(res.data)
      } else {
        setLoading("False");
        alert(res.data);
        Navigate('/inbox');
      }
    }).catch(err => {
      setLoading("False");
      alert("Could Not Restore This Inbox Back To Inbox At The Moment!! Please Try Again Later")
    })
  }

  const handleSentDelete = (event, id) => {
    setLoading("");
    axios.post('https://emailback-ylq9.onrender.com/deleteSentMsg', { id, userId }).then(res => {
      if (res.status != 200) {
        setLoading("False");
        alert(res.data)
      } else {
        setLoading("False");
        alert(res.data);
        Navigate('/sent');
      }
    }).catch(err => {
      setLoading("False");
      alert('Could not delete the message due to technical error!! please try again after some time')
    })
  }

  const styles = {
    main: {
      minHeight: "100vh",
      background: "url('img.jpg')",
      padding: "10px 10px",
      backgroundRepeat: "repeat"
    },
    wrapper: {
      width: "90%",
      background: "transparent",
      border: "2px solid rgba(255, 255, 255, .2)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      color: "#fff",
      borderRadius: "20px",
      padding: "30px 40px",
      margin: "10px 10px",
      zIndex: "-1"
    },
    h1: {
      color: "#fff",
      textAlign: "center"
    },
    button: {
      marginRight: "1vw",
      color: "#fff"
    },
    button2: {
      color: "#fff",
    },
    img: {
      height: "15vh",
      width: "15vw"
    }
  }

  const { state } = useLocation();
  let content;
  if (state.p.item.from) {
    content = "From: " + state.p.item.from;
  } else {
    content = "To: " + state.p.item.to;
  }


  let attachment;
  if (state.p.item.file) {
    attachment = <img src={"https://emailback-ylq9.onrender.com/" + state.p.item.file} style={styles.img}></img>
  } else {
    attachment = <h6>No attachment</h6>
  }


  let buttons;


  let button1;
  let button2;
  let button3;

  if (state.p.action.spam == 1 && state.p.action.block == 1 && state.p.action.delete == 1) {

    buttons = {

      button1: <button type="button" className="btn btn-warning" style={styles.button} onClick={event => handleSpam(event, state.p.item._id, state.p.item.date, state.p.item.from, state.p.item.msg, state.p.item.file)}><img style={styles.Icon} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAShJREFUSEvtlt0RgjAQhPcqUSpRKlErUStRK1ErUSs53ZnIhAwJ+RvxgXsl5MvuHRsEE5VMxMUM/pnz/2u1qm4BrAC8ANwAPEXkWWqNV7GqLgGcPrC1AyF8VwoPga8D0O8ZbiLSlqgeBBu1j5GNmxLVPjD7SptDRbvPuap9YPaVVoeqFRH2O6tCPabVHLCh4mQ3WUTzUgh8ALDxwHtqzUz4Dmmfr/sUgwGiqrR8b+DcmD29uBarKg/JdWN1FBGurXNJVAWbxKLKhWP3nQlmq65idSCxXBuLEqzX48jg6A0LAA5acna74NghseHdwIxNlv28A2eotfdJjk8bHJNWPlHJKWaDc2z+HiQ5t20wLwYmVU4xVJIujP/99cmRH/POrDjGpSprJrP6Df4rcB9qDYTDAAAAAElFTkSuQmCC" /> Spam</button>,
      button2: <button type="button" className="btn btn-danger" style={styles.button} onClick={event => handleDelete(event, state.p.item._id, state.p.item.file)}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAQFJREFUSEvtVsENwyAM9G3STdpM0naSNpukkzSdpNnExRIgiEhi4EEfIOURYXz2YewDNVpohEtZwMz83Al0ATBpE1EDW9DHgeMRwF5w/rgKmJkvRPRWZqMCj4AzAZRxeLMBwOz+/gb4RES33FSU9hOAJZlx6ICZJQj5qlZIb+hos7iYWYpJiqpmzQCGlIMO7FlJUD3azXPiCuSZfOx+2GTqqYZpSeJ4o4P5psHGILjTDnzcq9d33KleNYVeXI6Q/pzyn5NpiW7KXBMzW0Tey3oNJVI91YWzsRmwqI577jwW9fEtzNQdiwSeSoHYSSTgokJKJFCksdYJqHR1ZdbJ482Af8+Q4R+RUHNfAAAAAElFTkSuQmCC" /> Delete</button>,
      button3: <button type="button" className="btn btn-info" id='button2' onClick={event => handleBlock(event, state.p.item.from, state.p.item._id)} ><img style={styles.Icon} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAbNJREFUSEvtVu1NAzEMtSeBbkInoZ0EmIR2EsoklElM3smOnORySdMT96eRqpPy9Zz37OcybTR4I1x6AP8b84tUi8gLEb0SEb4YVyL6YObLvRFWgUXknYjeKgAAx/rwmAXWl365W09E9Kuvf9b5HTODgaFRAwYo6L0y885uFhGAYg3fCzPvh1CDXjVg0QsLSkXkMwR0wDoHvtcG/tFXnZj56C932idsYI+u4UwigYgcmBlyxdGkmoj2dpFSjaAwEqodE8j4oztjsiXs9SQXoj8T0ZNRrMAIKJaViBhLU1AAD2cgi5ViEuiq5ZSBI2CrgCIRewwEtYwL8INO5yUDycALSUzk4aysZbOImKa2JdG8CawmAn2grVGGc9+aWIVtzoBWwYsXa+b6pKg9rpa9kd484bzhJMBZufhoPbjpjTkk0FRurr7zMrNsR4nFWs6BfWMozMNZZ3Qv7VZTw5gzitp8BF4yhzmuvXWGTL+5YXhgJJJ1pMQcKsB+f0Jjj3974Ehzr/lLEFZB7gJGx8G/DXSdrnan5YMjMJWkCbRevbqBtACbBtJ7wei+x4tHmbv53GZU/wEzld0fGd0q+wAAAABJRU5ErkJggg==" /> Block</button>

    }

  } else if (state.p.action.restore == 1 && state.p.action.delete == 1) {
    buttons = {
      button1: <button type="button" class="btn btn-success" style={styles.button} onClick={event => handleRestore(event, state.p.item._id, state.p.item.date, state.p.item.from, state.p.item.msg, state.p.item.file)}> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAdZJREFUSEvlli1SQzEUhc/xaAwGFBaLot0GiloUCgvVKFZAEeiugKEsgRVQi2YBhx4meZPm5fHSlk6H4c68eSLJ/XJ/c4kdCXfExd8CSxqQnG3irSqLJV0AOAMwAHC4+M9IDrcGtmUAbgIw5WwPHKAvmVUTAK8A5ltxdQE6Imnor0krxhl0DsDQjRKpdNsSWGHj1qDWvwSWdBuSyWsbu1fSw4IxJmkjliQHN9aSPMo3S9oHcAngFMAHgCnJacmVoQQNNnSYwxuwJNfne1DiW9r6RiQdA3gGcJCB7kheZ3tTXV5q6UvBrtlYPkf5DSU9ATjvSOsTkm9xTZL1WF8qS/AUnMa3BP4EsNcBviJ577UOaDzW6E3BbouOiWVtcGJ1NMTNppUvq4CrXR0stxE2phecxrhVShsk14TkqK+cnNWdr09tOdX0g7yO0zi79tZqlZKiAUU3tzpXiE08VEyyjqxO6z3Gtli/cWOpV6dlVew6XfDQIu01y49vdnECyWJk+DgoavXc4KV8YOgdFDpHnwxu/Yb68yDg2DsJ/cWRKDqiF1qMcerG8DY7ZgbUSLF0Sgdrh73oymhlqsvWP646oVSB8xsHT3zHu/TW1rhmLXCN4r49/w/8Bc+t7x/FiEQ9AAAAAElFTkSuQmCC" /> Restore</button>,
      button2: <button type="button" class="btn btn-danger" style={styles.button2} onClick={event => handleSpamDelete(event, state.p.item._id)}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAQFJREFUSEvtVsENwyAM9G3STdpM0naSNpukkzSdpNnExRIgiEhi4EEfIOURYXz2YewDNVpohEtZwMz83Al0ATBpE1EDW9DHgeMRwF5w/rgKmJkvRPRWZqMCj4AzAZRxeLMBwOz+/gb4RES33FSU9hOAJZlx6ICZJQj5qlZIb+hos7iYWYpJiqpmzQCGlIMO7FlJUD3azXPiCuSZfOx+2GTqqYZpSeJ4o4P5psHGILjTDnzcq9d33KleNYVeXI6Q/pzyn5NpiW7KXBMzW0Tey3oNJVI91YWzsRmwqI577jwW9fEtzNQdiwSeSoHYSSTgokJKJFCksdYJqHR1ZdbJ482Af8+Q4R+RUHNfAAAAAElFTkSuQmCC" /> Delete</button>,
      button3: null
    }
  } else if (state.p.action.delete == 1) {
    buttons = {
      button1: <button type="button" class="btn btn-danger" style={styles.button} onClick={event => handleSentDelete(event, state.p.item._id)} ><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAQFJREFUSEvtVsENwyAM9G3STdpM0naSNpukkzSdpNnExRIgiEhi4EEfIOURYXz2YewDNVpohEtZwMz83Al0ATBpE1EDW9DHgeMRwF5w/rgKmJkvRPRWZqMCj4AzAZRxeLMBwOz+/gb4RES33FSU9hOAJZlx6ICZJQj5qlZIb+hos7iYWYpJiqpmzQCGlIMO7FlJUD3azXPiCuSZfOx+2GTqqYZpSeJ4o4P5psHGILjTDnzcq9d33KleNYVeXI6Q/pzyn5NpiW7KXBMzW0Tey3oNJVI91YWzsRmwqI577jwW9fEtzNQdiwSeSoHYSSTgokJKJFCksdYJqHR1ZdbJ482Af8+Q4R+RUHNfAAAAAElFTkSuQmCC" /> Delete</button>,
      button2: null,
      button3: null
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
        <h1 style={styles.h1}>Message</h1>
        <br /><br />
        <div style={styles.wrapper} className="wrapper">
          Date:  {state.p.item.date}
          <br /><br />
          {content}
          <br /><br />
          Attachment: {attachment}
          <br /><br />
          Content: {CryptoJS.AES.decrypt(state.p.item.msg, secretKey).toString(CryptoJS.enc.Utf8)}
          <br /><br />
          Actions:
          <br /><br />
          {buttons.button1} {buttons.button2} {buttons.button3}
        </div>
      </main>
    )
  }
}

export default Expand
