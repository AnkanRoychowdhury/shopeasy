import React from 'react'
import Login from '../components/Login'
const LoginPage = ({isLogged, setIsLogged, setUserEmail}) => {
  return (
    <div>
        <Login setIsLogged={setIsLogged} setUserEmail={setUserEmail}></Login>
    </div>
  )
}

export default LoginPage;