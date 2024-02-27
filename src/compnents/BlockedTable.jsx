import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const BlockedTable = ({ data }) => {
  const userId = localStorage.getItem('userId');
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
  const adata = Array.from(data);
  const Navigate = useNavigate();

  function handleRestore(event, id, User) {
    const userId = localStorage.getItem('userId');
    axios.post('https://emailback-5jmh.onrender.com/restoreBlocked', { id, User, userId }).then(res => {
      if (res.status != 200) {
        alert(res.data)
      } else {
        alert(res.data);
        Navigate('/inbox');
      }
    }).catch(err => {
      alert("Could Not Restore This Inbox Back To Inbox At The Moment!! Please Try Again Later")
    })
  }

  let content;

  if (adata.length == 0) {
    content = <table>
      <thead>
        <tr>
          <th scope="col">UserId</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <td colSpan={2}>
          <img src="No.png" alt="" srcset="" />
          <h5>No User Is Blocked Currently..</h5>
        </td>
      </tbody>
    </table>
  } else {
    content = <table>
      <thead>
        <tr>
          <th scope="col">UserId</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {adata.map((item) => (
          <>
            <tr>
              <td data-label="UserId">{item.User}</td>
              <td data-label="Action">
                <button type="button" class="btn btn-success" style={styles.button} onClick={event => handleRestore(event, item._id, item.User)}> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAdZJREFUSEvlli1SQzEUhc/xaAwGFBaLot0GiloUCgvVKFZAEeiugKEsgRVQi2YBhx4meZPm5fHSlk6H4c68eSLJ/XJ/c4kdCXfExd8CSxqQnG3irSqLJV0AOAMwAHC4+M9IDrcGtmUAbgIw5WwPHKAvmVUTAK8A5ltxdQE6Imnor0krxhl0DsDQjRKpdNsSWGHj1qDWvwSWdBuSyWsbu1fSw4IxJmkjliQHN9aSPMo3S9oHcAngFMAHgCnJacmVoQQNNnSYwxuwJNfne1DiW9r6RiQdA3gGcJCB7kheZ3tTXV5q6UvBrtlYPkf5DSU9ATjvSOsTkm9xTZL1WF8qS/AUnMa3BP4EsNcBviJ577UOaDzW6E3BbouOiWVtcGJ1NMTNppUvq4CrXR0stxE2phecxrhVShsk14TkqK+cnNWdr09tOdX0g7yO0zi79tZqlZKiAUU3tzpXiE08VEyyjqxO6z3Gtli/cWOpV6dlVew6XfDQIu01y49vdnECyWJk+DgoavXc4KV8YOgdFDpHnwxu/Yb68yDg2DsJ/cWRKDqiF1qMcerG8DY7ZgbUSLF0Sgdrh73oymhlqsvWP646oVSB8xsHT3zHu/TW1rhmLXCN4r49/w/8Bc+t7x/FiEQ9AAAAAElFTkSuQmCC" /> Restore</button>
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
     {
      content
    }
    </>
  )
}

export default BlockedTable
