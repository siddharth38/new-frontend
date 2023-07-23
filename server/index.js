require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = process.env.PORT || 3001
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
// register
app.post("/create", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const dob = req.body.dob;
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM employees WHERE Email= ? ",
    [email],
    (err, result) => {
      if (result.length > 0) {
        res.send("Exist");
      }
      else{db.query(
    "INSERT INTO employees  (`Firstname`, `Lastname`, `Phone`, `DOB`, `Email`, `Password`) VALUES (?,?,?,?,?,?)",
    [ firstname, lastname, phone, dob, email ,password ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    })}
  }
  );
});


//login
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM employees WHERE Email= ? AND Password = ? ",
    [email ,password],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if(result.length > 0)
      {
        res.send(result[0]);
      }
       else {
        res.send("wrong input");
      }
    }
  );
});


//userlist
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// user
app.get("/employees/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM employees  WHERE id = ?",id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result[0]);
    }
  });
});

//update
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const dob = req.body.dob;
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "UPDATE employees SET Firstname = ? , Lastname= ?, Phone = ? , DOB = ?, Email = ?, Password = ?  WHERE id = ?",
    [firstname, lastname, phone, dob, email ,password, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// delete
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log("Server OKK");
});
