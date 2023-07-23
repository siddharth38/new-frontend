import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Axios from "axios";

const Home = () => {

  useEffect(() => {
    return () => {
      getEmployees()
    };
  }, [])

  const [blur, setblur] = useState("noblur")
  const [loading, setloading] = useState("noloader")
  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    Axios.get("https://backend-ev12.onrender.com/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };


  const deleteEmployee = (id) => {
    setblur("blur");
    setloading("loader");
    Axios.delete(`https://backend-ev12.onrender.com/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
         
        })
      );
      setblur("noblur");
      setloading("noloader");
    });
  };

  return <div>
    <div className={blur}>
                <div className={loading}></div>
            </div>

    <div className="container">
      <div className="row">
        <div className="col mt-4">
          <h5 className="mb-4">User List</h5>
          <p className="text-danger"></p>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Phone</th>
                <th scope="col">DOB</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
              </tr>
            </thead>
            <tbody>
              {
                employeeList.map((val, index) => (
                  <tr key={index}>
                    <td>{val.Firstname} </td>
                    <td> {val.Lastname}</td>
                    <td>{val.Phone}</td>
                    <td>{val.DOB.slice(0,10)}</td>
                    <td>{val.Email}</td>
                    <td>{val.Password} </td>
                    <td>
                      <Link to={"/edituser/" + val.id} className="btn btn-success mx-2">Edit</Link>
                      <button className="btn btn-danger" onClick={() => { deleteEmployee(val.id); }}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>;
}



export default Home;