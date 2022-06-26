import React, {useState} from 'react';
import navbarLogo from "../../assets/logos/navbar-logo.png"
import "./footer.css"
import {TextareaAutosize, TextField} from "@mui/material";
import {Form, FormGroup, Button} from "reactstrap";


const Footer = () => {
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const submitHandle = (e) => {
        setName("")
        setMessage("")
        e.preventDefault()
    }
    return (
        <div className={"footer-container"}>
            <div className={"footer-top"}>
                <div className={"footer-left"}>
                    <div className={"footer-img-container"}>
                        <img src={navbarLogo} alt="" className={"footer-logo"}/>
                    </div>
                    <div className={"footer-text-container"}>
                        <p className={"footer-txt"}>About Us</p>
                        <p className={"footer-txt"}>Privacy Policy</p>
                        <p className={"footer-txt"}>Loyalty program</p>
                        <p className={"footer-txt"}>Our shops</p>
                        <p className={"footer-txt"}>I want to be a franchisee</p>
                        <p className={"footer-txt"}>Advertise here</p>
                    </div>
                </div>
                <Form className={"footer-form"} onSubmit={submitHandle}>
                    <p className={"talk-us"}>Talk with us</p>
                    <FormGroup className={"w-100"}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            size={"small"}
                            className={"w-100"}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value.trim())
                            }}
                            style={{marginBottom: 16, backgroundColor: "white"}}
                        />
                    </FormGroup>
                    <FormGroup className={"w-100 textArea-formGroup"}>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Write your message"

                            className={"w-100 textArea"}
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value.trim())
                            }}
                        />
                    </FormGroup>
                    <div style={{paddingTop: 8}}>
                        <Button className={"message-btn"}>Send Message</Button>
                    </div>
                </Form>
            </div>
            <div className={"footer-bottom"}>
                <p className={"developed"}>Developed by Yusif Hasanov</p>
                <p className={"year"}>2022</p>
            </div>
        </div>
    );
};

export default Footer;