import React from 'react';
import {NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const history = useNavigate();
    const setTime = () => {

        if (localStorage.getItem('ShivamITech')) {
            localStorage.removeItem('ShivamITech')
          history("/")
        }
        else { history("/login") }
      }
    const x =localStorage.getItem('ShivamITech') 
     const y = JSON.parse(x)
    return <div>
        <nav className="navbar navbar-expand-lg" style={{backgroundColor : "#ADD8E6"}} >
          <div className="container">
             <NavLink  className="navbar-brand"> ShivamITech Assignment</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 ml-5">
        
            <li className="nav-item m-3">
              <NavLink to="/register" className="nav-link">Register</NavLink>
            </li>  
            <li className="nav-item m-3">
              <NavLink to="/" className="nav-link">UserList</NavLink>
            </li>  
            <li className="nav-item m-3">
              {localStorage.getItem('ShivamITech') ? (<><NavLink className="nav-link">Welcome {y.Firstname} </NavLink>  </>): ("")}
            </li> 
            <li className="nav-item">
                {localStorage.getItem('ShivamITech') ? <button className="btn btn-danger mt-3" onClick={setTime} > logout</button> : <button className="btn btn-success mt-3"  onClick={setTime}> login </button>}
              </li>
          </ul>
        
    </div>
  </div>
</nav>
    </div>;
}



export default Navbar;