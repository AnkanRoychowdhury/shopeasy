import React from 'react'
import Register from './../components/Register';

const RegisterPage = ({setIsLogged}) => {
    return (
        <div>
            <Register setIsLogged={setIsLogged}></Register>
        </div>
    )
}

export default RegisterPage;