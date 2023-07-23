import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Edit from "./Pages/Edit/Edit";
import Navbar from "./Component/Navbar/Navbar";
import Privateroutes from "./Component/Privateroutes/Privateroutes";

function App() {
  const [names, setName] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    dob: "",
    email: "",
    password: "",
  });


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route element={<Privateroutes />}>
            <Route path="/" element={<Home/>}></Route>
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="edituser/:id" element={<Edit />} />
        </Routes>

      </Router>

      <div className="employees">

      </div>
    </div>
  );
}

export default App;
