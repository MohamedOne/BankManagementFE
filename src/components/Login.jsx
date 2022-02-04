import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {

    const navigate = useHistory()
    const dispatch = useDispatch()
    const[username, setUsername] = useState(0)
    const[password, setPassword] = useState("")



    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({
            type: 'PUT_CID',
            payload: username
        })
        navigate.push('/account')
    }

    return (
        <div className="encasing-div">
            <h1 className="login-title">Welcome</h1>
            <h2 className="login-subtitle">Banco Revature </h2>
            <form action="" className="login-form" onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    className="username-input" 
                    placeholder='CustomerID' 
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    className="password-input" 
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input 
                    type="submit" 
                    className="login-form-submit" 
                    
                />
            </form>
        </div>
    )
}
export default Login;