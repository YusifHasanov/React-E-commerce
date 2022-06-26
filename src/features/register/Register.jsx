import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup } from "reactstrap";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import Swal from "sweetalert2";
import { addCustomer } from "./registerSlice";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import getAllCustomers from "../../fetch/getAllCustomers";
import postCustomer from "./../../fetch/postCustomer";

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allCustomers, setAllCustomers] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,16}$/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    getAllCustomers().then((r) => setAllCustomers(r));
  }, [Register]);

  const submitHandler = (e) => {
    getAllCustomers().then((r) => setAllCustomers(r));
    try {
      if (
        [name, email, password, confirmPassword].some((input) => input === "")
      )
        throw "Please fill all fields";
      if (!email.match(emailRegex)) throw "Please enter Valid Email";
      if (!passwordRegex.test(password)) throw "Please Enter Vali Password";
      if (password !== confirmPassword) throw "Please enter same passwords";
      if (allCustomers.some((item) => item.email === email))
        throw "This email already used";
      successfullyRegistered();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500,
      }).then((r) => console.log(r));
    } finally {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }

    e.preventDefault();
  };

  const successfullyRegistered = () => {
    dispatch(addCustomer(name, email, password));
    postCustomer({ name, email, password, id: nanoid() }, "customers").then(
      (r) => console.log(r)
    );
    Swal.fire({
      icon: "success",
      title: "Successfully Registered",
      showConfirmButton: false,
      timer: 1500,
    }).then((r) => console.log(r));
    navigate("/login", { replace: true });
  };

  return (
    <div className={"register-container"}>
      <p>Register</p>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <TextField
            label="Name"
            variant="outlined"
            size={"small"}
            className={"w-100"}
            value={name}
            onChange={(e) => {
              setName(e.target.value.trim());
            }}
            style={{ marginBottom: 16, backgroundColor: "white" }}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type={"email"}
            label="Email"
            variant="outlined"
            size={"small"}
            className={"w-100"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.trim());
            }}
            style={{ marginBottom: 16, backgroundColor: "white" }}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type={"password"}
            label="Password"
            variant="outlined"
            size={"small"}
            className={"w-100"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value.trim());
            }}
            style={{ marginBottom: 16, backgroundColor: "white" }}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type={"password"}
            label="Password"
            variant="outlined"
            size={"small"}
            className={"w-100"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value.trim());
            }}
            style={{ marginBottom: 16, backgroundColor: "white" }}
          />
        </FormGroup>
        <Button className={"register-btn mx-3"}>Register</Button>
        <Link to={"/login"} className={"linkTo"}>
          Have Already Account
        </Link>
      </Form>
    </div>
  );
};

export default Register;
