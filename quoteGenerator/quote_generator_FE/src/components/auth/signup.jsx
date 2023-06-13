import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Signup = () =>{
    const url ="http://localhost:3500/";
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSignup = async() =>{
        try {
            const response = await Axios.post(`${url}auth/signup`,  {username: username, password: password})
            const {message} = response.data;
            setMessage(message)
        } catch (error) {
            setMessage(error.response.data.message)
        }
    }

    return (
        <>
            <div>
                <h2>Sign up</h2>
                <input 
                type="text" 
                placeholder="username"
                value= {username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                type="password" 
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignup}>Sign up</button>
                <Link to = "/signin">sign in</Link>
            </div>
            {message && <p>{message}</p>}
        </>
    )
}

export default Signup