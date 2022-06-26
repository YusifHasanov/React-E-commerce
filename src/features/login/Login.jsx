import React, {useState, useEffect} from 'react';
import {Form, FormGroup, Button} from "reactstrap";
import {TextField} from "@mui/material";
import "./login.css"
import {Link, useNavigate} from "react-router-dom";
import getAllCustomers from "../../fetch/getAllCustomers";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {addLoggedUser} from "./loginSlice";
import postCustomer  from "../../fetch/postCustomer";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [allCustomers, setAllCustomers] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        getAllCustomers().then(r => setAllCustomers(r))

    }, [Login])

    const submitHandler = (e) => {

        getAllCustomers().then(r => setAllCustomers(r))
        try {
            if ([email, password].some(input => input === "")) throw ("Please fill all fields")
            if (allCustomers.every(item => item.email !== email)) throw ("Email don't atch")
            if (allCustomers.every(item => item.password !== password)) throw ("Password don't match")
            successfullyLogged()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error,
                showConfirmButton: false,
                timer: 1500
            }).then(r => console.log(r))
        } finally {
            setEmail("")
            setPassword("")
        }

        e.preventDefault()
    }


    const successfullyLogged = () => {
        allCustomers.map(item=>{
            if(item.email === email && item.password ===password){
                dispatch(addLoggedUser({
                    name: item.name,
                    email: item.email, 
                    password:item.password,
                    id: item.id,
                }))
                postCustomer({name: item.name,
                    email: item.email,
                    password:item.password,
                    id: item.id},"loggedCustomer").then(r => console.log(r))
            }
        })
        navigate("/", {replace: true})
        Swal.fire({
            icon: 'success',
            title: "Successfully Logged",
            showConfirmButton: false,
            timer: 1500
        }).then(r =>   console.log(r))

    }


    return (
        <div className={"login-container"}>
            <p>Log in</p>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <TextField
                        type={"email"}
                        label="Email"
                        variant="outlined"
                        size={"small"}
                        className={"w-100"}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value.trim())
                        }}
                        style={{marginBottom: 16, backgroundColor: "white"}}
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
                            setPassword(e.target.value.trim())
                        }}
                        style={{marginBottom: 16, backgroundColor: "white"}}
                    />

                    <Button className={"login-btn mx-3"}>Login</Button>
                    <Link to={"/register"} className={"linkTo"}>Register Now</Link>
                </FormGroup>
            </Form>
        </div>
    );
};

export default Login;