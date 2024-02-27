import React from 'react'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const secretKey = '12345';

const Table = ({ data }) => {


  const Navigate = useNavigate();
  const userId = localStorage.getItem('userId');


  const action = {
    spam: 1,
    block: 1,
    delete: 1
  };

  const handleMore = (item) => {

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

  const adata = Array.from(data);

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
        <h5>No Messages...</h5>
      </td>
      <td></td>
    </tbody>
  </table>
  } else {
    content = <table>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">From</th>
          <th scope="col">Message</th>
        </tr>
      </thead>
      <tbody>
        {adata.map((item) => (
          <>
            <tr onClick={event => handleMore(item)}>

              <td data-label="Date">{item.date}</td>
              <td data-label="From">{item.from}</td>
              <td data-label="Message" aria-setsize={2}><p className='para'> {
                CryptoJS.AES.decrypt(item.msg, secretKey).toString(CryptoJS.enc.Utf8)
              }
              </p>
              </td>
            </tr>
          </>
        )
        )}
      </tbody>
    </table>
  }

  return (
    <>
      {content}
    </>
  )
}




export default Table
