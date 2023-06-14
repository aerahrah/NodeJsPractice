import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookie, getCookie } from "../utils/cookieUtils";

const Signin = () =>{
    const navigate = useNavigate();
    const url ="http://localhost:3500/";
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSignin = async() =>{
        try {
            const response = await Axios.post(`${url}auth/signin`, {username: username, password: password})
            const {message, token} = response.data;
            setMessage(message);
            setCookie("token", token, 1)
            navigate("/quote-generator");
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    return (<>
        <div>
            <h1>Sign In</h1>
            <input 
            type="text" 
            value={username}
            placeholder="username"
            onChange={(e)=>setUsername(e.target.value)}
            />
            <input 
            type="password" 
            value={password}
            placeholder="password"
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={handleSignin}>Sign in</button>
        </div>
        {message && <p>{message}</p>}
    </>)
}
export default Signin