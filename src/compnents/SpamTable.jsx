import React from 'react';
import CryptoJS from 'crypto-js';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const secretKey = '12345';


const SpamTable = ({data}) => {
  const adata = Array.from(data);
    const styles = {
        para: {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginTop: "1vh"
        },
        button: {
          marginRight: "1vw",
          color: "#fff"
        }
      }

      const Navigate = useNavigate();



      const action = {
        restore: 1,
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

      let content;

      if (adata.length == 0) {  
        content = <table>
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
            <h5>No Users Added To Spam Currently..</h5>
          </td>
          <td></td>
        </tbody>
      </table>
    }else{
     content = <table>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">From</th>
          <th scope="col">Message</th>
        </tr>
      </thead>
      <tbody>
          {
            adata.map((item)=>(
              <>
              <tr onClick={event => handleMore(item)}>
                <td data-label="Date">{item.date}</td>
                <td data-label="From">{item.from}</td>
                <td data-label="Message"><p className='para'>{
                   CryptoJS.AES.decrypt(item.msg, secretKey).toString(CryptoJS.enc.Utf8)
                  }</p>
                 
                  </td>
                </tr>
              </>
            ))
          } 
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

export default SpamTable
