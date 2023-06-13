import { useState } from "react";
import Axios from "axios";

const Signin = () =>{
    const url ="http://localhost:3500/";
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSignin = async() =>{
        try {
            const response = await Axios.post(`${url}auth/signin`, {username: username, password: password})
            const {message, token} = response.data;
            setMessage(message);
            Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } catch (error) {
            setMessage(error.response.data.message);
        }
    }

    return (<>
        <div>
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