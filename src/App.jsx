import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import Signup from './pages/Signup.jsx';
import ForgotPass from './pages/ForgotPass.jsx';
import Inbox from './pages/Inbox.jsx';
import NewMail from './pages/NewMail.jsx';
import Spam from './pages/Spam.jsx';
import Sent from './pages/Sent.jsx';
import Blocked from './pages/Blocked.jsx';
import Expand from './pages/Expand.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import LoadingComponent from './compnents/LoadingComponent.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<LoginPage></LoginPage>}></Route>
            <Route path='/register' element={<Signup></Signup>}></Route>
            <Route path='/forgot-password' element={<ForgotPass></ForgotPass>}></Route>
            <Route path='/inbox' element={<Inbox></Inbox>}></Route>
            <Route path='/new' element={<NewMail></NewMail>}></Route>
            <Route path='/spam' element={<Spam></Spam>}></Route>
            <Route path='/sent' element={<Sent></Sent>}></Route>
            <Route path='/blocked' element={<Blocked></Blocked>}></Route>
            <Route path='/expand' element={<Expand></Expand>}></Route>
            <Route path='/resetPass' element={<ResetPassword></ResetPassword>}></Route>
            <Route path='/loading' element={<LoadingComponent></LoadingComponent>}></Route>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
