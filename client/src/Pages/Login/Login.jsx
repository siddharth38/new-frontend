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
    const [blur, setblur] = useState("noblur")
    const [loading, setloading] = useState("noloader")
    const adddata= () => {
        setblur("blur");
        setloading("loader");
        if (user.email === "") {
            alert('email field is requred');
            setblur("noblur");
            setloading("noloader");
           
        } else if (!user.email.includes("@")) {
            alert('plz enter valid email addres');
            setblur("noblur");
            setloading("noloader");
           
        } else if (user.password === "") {
            alert('password field is requred');
            setblur("noblur");
            setloading("noloader");
          
        } else if (user.password.length < 5) {
            alert('password length greater five');
            setblur("noblur");
            setloading("noloader");
           
        } else {
        axios.post("https://backend-ev12.onrender.com/login", {
          email: user.email,
          password: user.password,
        }).then((response) => {
            console.log(response.data)
            setblur("noblur");
            setloading("noloader");
            if(response.data.id ==="" || response.data === "wrong input")
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
         <div className={blur}>
                <div className={loading}></div>
            </div>
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