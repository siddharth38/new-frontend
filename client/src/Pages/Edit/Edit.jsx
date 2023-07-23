import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios'
const Edit = () => {
    const { id } = useParams();
    const navigate= useNavigate();  
    const [formvalue, setFormvalue] = useState({Firstname:'', Lastname:'', Email:'' ,Phone : '' ,DOB : '' , Password: ''});
    const [message, setMessage]= useState('');
    useEffect(() => {

        userRowdata();
    }, []);

    const userRowdata = () => {
        axios.get("http://localhost:3001/employees/" + id).then((response) => {
            setFormvalue(response.data)
        });
    }

    const handleInput =(e)=>{
        setFormvalue({...formvalue, [e.target.name]:e.target.value});
    }

    const handleSubmit =async(e)=>{
        if (formvalue.Email === "") {
            alert('email field is requred');
           
        } else if (!formvalue.Email.includes("@")) {
            alert('plz enter valid email addres');
           
        } else if (formvalue.Password === "") {
            alert('password field is requred');
          
        } else if (formvalue.Password.length < 5) {
            alert('password length greater five');
           } 
           else if (formvalue.DOB === "") {
            alert('DOB field is requred');
          
        }
           else if (formvalue.DOB.length !== 10) {
            alert('Enter Valid DOB');
           
        }else {
        e.preventDefault();
        axios.put("http://localhost:3001/update/"+id, {
            firstname: formvalue.Firstname,
            lastname: formvalue.Lastname,
            phone: formvalue.Phone,
            dob : formvalue.DOB,
            email: formvalue.Email,
            password: formvalue.Password,
          }).then((response) => {
             setMessage("User updated SuccessFully")
             setTimeout( ()=>{               
                navigate('/');
            }, 2000);
          })}
       } 
    return <div>
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-4">
                    <h5 className="mb-4">Edit Users</h5>
                    <p className="text-sucess " style={{color:"red"}}> { message }</p>    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 row">
                            <label className="col-sm-2">Firstname</label>
                            <div className="col-sm-10">
                                <input type="text" name="Firstname" value={formvalue.Firstname} className="form-control" onChange={handleInput}  />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2">LastName</label>
                            <div className="col-sm-10">
                                <input type="text" name="Lastname" value={formvalue.Lastname} className="form-control" onChange={handleInput}   />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2">Phone</label>
                            <div className="col-sm-10">
                                <input type="number" name="Phone" value={formvalue.Phone} className="form-control" onChange={handleInput}   />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2">Email</label>
                            <div className="col-sm-10">
                                <input type="text" name="Email" value={formvalue.Email} className="form-control"  onChange={handleInput}  />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2">DOB</label>
                            <div className="col-sm-10">
                                <input type="text" name="DOB" value={formvalue.DOB} className="form-control" onChange={handleInput}  />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2">Password</label>
                            <div className="col-sm-10">
                                <input type="text" name="Password" value={formvalue.Password} className="form-control" onChange={handleInput}   />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2"></label>
                            <div className="col-sm-10">
                                <button name="submit" className="btn btn-success">Update</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>;
}


export default Edit;