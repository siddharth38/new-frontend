
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import './register.css'
const Register = () => {
    const navigate = useNavigate();
    const [names, setName] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        dob : "",
        email: "",
        password: "",
      });
      const [blur, setblur] = useState("noblur")
      const [loading, setloading] = useState("noloader")
  
  
      const handleChange = e => {
        const { name, value } = e.target
        setName({
            ...names,
            [name]: value
        })
      
    }
    const addEmployee = () => {
        setblur("blur");
        setloading("loader");
        
        if (names.firstname === "") {
            alert(' First name field is requred!'
            );  setblur("noblur");
            setloading("noloader");
        } else if (names.lastname === "") {
             alert('Last name field is requred');
             setblur("noblur");
             setloading("noloader");
        } else if (!names.email.includes("@")) {
             alert('plz enter valid email addres');
             setblur("noblur");
             setloading("noloader");
        } else if (names.dob === "") {
             alert('DOB field is requred');
             setblur("noblur");
             setloading("noloader");
        } else if (names.dob.length !== 10 ) {
            alert('DOB field is invalid');
            setblur("noblur");
            setloading("noloader");
       }
        else if (names.phone === "") {
            alert('password length greater five');
            setblur("noblur");
            setloading("noloader");
       } else if (names.phone.length < 5) {
            alert('password length greater five');
            setblur("noblur");
            setloading("noloader");
       } else if (names.password === "") {
            alert('password field is requred');
            setblur("noblur");
            setloading("noloader");
       } else if (names.password.length < 5) {
            alert('password length greater five');
            setblur("noblur");
            setloading("noloader");
       } else {
        Axios.post("https://backend-ev12.onrender.com/create", {
          firstname: names.firstname,
          lastname: names.lastname,
          phone: names.phone,
          dob : names.dob,
          email: names.email,
          password: names.password,
        }).then((response) => {
            console.log(response.data)
            if(response.data === "Exist")
            {
                alert("Email Already Exist")
                setblur("noblur");
                setloading("noloader");
            }
            else{
              alert("Registration Successful")
               navigate("/login")
               setblur("noblur");
               setloading("noloader");
            }
        })
       
       }
        
      };
    return <div>
         <div className={blur}>
                <div className={loading}></div>
            </div>
       <div className="register">
       <h1>Register</h1>
       <input type="text" name="firstname" value={names.firstname} onChange={handleChange} placeholder="Enter your First name"></input>
        <input type="text" name="lastname" value={names.lastname} onChange={handleChange} placeholder="Enter your Last name"></input>
        <input type="number" name="phone" value={names.phone} onChange={handleChange} placeholder="Enter your Phone No"></input>
        <input type="text" name="dob" value={names.dob} onChange={handleChange} placeholder="Please Enter DOB in YYYY-MM-DD"></input>
        <input type="text" name="email" value={names.email} onChange={handleChange} placeholder="Enter your Email"></input>
        <input type="text" name="password" value={names.password} onChange={handleChange} placeholder="Enter your password"></input>

        <div className='button' onClick={addEmployee}>Add Employee</div>
       <div style={{ color: "black" }}>
          {" "}
          Already have account{" "}
          <span className="xyz" onClick={() => navigate("/login")}>Login
            </span>
        </div>
        </div>
    </div>;
}


export default Register;