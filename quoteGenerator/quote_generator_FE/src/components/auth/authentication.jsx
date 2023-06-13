import { useState } from "react";
import Axios from "axios";

const Auth = () =>{
    const url ="http://localhost:3500/";
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [activeTab, setActiveTab] = useState("")

    const handleSignup = async () =>{
        try {
            const response = await Axios.post(`${url}auth/signup`, {username: username, password: password});
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    }

    const handleSignin = async () =>{
        try{
            const response = await Axios.post(`${url}auth/signin`, {username: username, password: password});
            const { message, token } = response.data;
            setMessage(message);
            Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }catch(error){
            setMessage(error.response.data.message);
        }
    }
    return (
        <>
        <div>
            <h1>Qoute Generator</h1>
            <button onClick={() =>setActiveTab("signup")}>Sign up</button>
            <button onClick={()=> setActiveTab("signin")}>Sign in</button>
        </div>
        {activeTab === "signup" && (
            <div>
                <h2>Sign Up</h2>
               <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignup}>Sign up</button>
            </div>
        )}
        {activeTab === "signin" &&(
            <div>
                <h2>Sign In</h2>
                <input 
                type="text"
                placeholder="username"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                 />
                 <input
                 type="password"
                 placeholder="password"
                 value={password}
                 onChange={(e)=> setPassword(e.target.value)}
                />
                <button onClick={handleSignin}>Sign in</button>
            </div>
        )
        }
          {message && <p>{message}</p>}
        </>
    )
}

export default Auth;