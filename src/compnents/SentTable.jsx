import React from 'react'
import CryptoJS from 'crypto-js'
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'



const secretKey = '12345';


const userId = localStorage.getItem('userId');


const SentTable = ({ data }) => {


  const Navigate = useNavigate();


    const styles = {
        para: {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        },
        button: {
          marginRight: "1vw",
          color: "#fff"
        }
      }  
  const adata = Array.from(data);

  
  const action = {
    delete: 1
  };

  const handleMore = (item) =>{

    const p = {
      item,
      action
    }


    Navigate('/expand', { 
      state: {
        p
      }
    });
  }

  if (adata.length == 0){
    var content = <table>
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">From</th>
        <th scope="col">Message</th>
      </tr>
    </thead>
    <tbody>
      <td></td>
      <td>
      <img src="Reload.png" alt="" srcset="" />
        <h5>No Messages...</h5>
      </td>
      <td></td>
    </tbody>
  </table>

  }else{
    var content = <table>
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">To</th>
        <th scope="col">Message</th>
       
      </tr>
    </thead>
    <tbody>
      {adata.map((item) => (
        <>
        <tr onClick={event => handleMore(item)}>
          <td data-label="Date">{item.date}</td>
          <td data-label="To">{item.to}</td>
          <td data-label="Message" aria-setsize={2}><p className='para'> {
             CryptoJS.AES.decrypt(item.msg, secretKey).toString(CryptoJS.enc.Utf8)
          }</p></td>
       
        </tr>
       </>
      )
      )}
    </tbody>
  </table>
  }




  return (
    <>
      {
        content  
      }
      </>
  )
}

export default SentTable
