import React, { useState } from "react"
import "./login.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const history = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const adddata= () => {
        if (user.email === "") {
            alert('email field is requred');
           
        } else if (!user.email.includes("@")) {
            alert('plz enter valid email addres');
           
        } else if (user.password === "") {
            alert('password field is requred');
          
        } else if (user.password.length < 5) {
            alert('password length greater five');
           
        } else {
        axios.post("http://localhost:3001/login", {
          email: user.email,
          password: user.password,
        }).then((response) => {
            console.log(response.data)
          
            if(response.data.id ==="")
            {   alert(response.data)
                
            }
            else {
                alert("Login Successful")
                history('/');
                localStorage.setItem('ShivamITech',JSON.stringify(response.data))
            }
        })
    }
      };

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    return <div>
        <div className="container">
                <div className="login">
                    <h1>Login</h1>
                    <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" ></input>

                    <div className="button" onClick={adddata}>Login</div>
                    <div style={{ color: "black" }}> or </div>
                    <div style={{ color: "black" }}>  Create an account <span className="xyz" onClick={() => history("/register")} > Register </span></div>
                </div>
            </div>
    </div>;
}


export default Login;