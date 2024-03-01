import React from 'react'


function Logout(){
  localStorage.removeItem('userId');
}

const NavBar = () => {
  
  return (
    <div class="nav">
  <input type="checkbox" id="nav-check" />
  <div class="nav-header">
    <div class="nav-title">
      SafeMail.
    </div>
  </div>
  <div class="nav-btn">
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div class="nav-links">
    <a href="/new" >+ New</a>
    <a href="/inbox">Inbox</a>
    <a href="/sent">Sent</a>
    <a href="/spam">Spam</a>
    <a href="/blocked">Blocked</a>
    <a href="https://emailsys.netlify.app/" onChange={Logout}>Logout</a>
  </div>
</div>
  )
}

export default NavBar
