const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "employeeSystem",
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
        res.send(" User Already Exist ");
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

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
