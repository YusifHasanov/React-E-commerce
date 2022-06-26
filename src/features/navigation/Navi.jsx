import React, {useEffect, useState} from "react";
import "./navi.css";
import navbarLogo from "../../assets/logos/navbar-logo.png";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {addLoggedUser, loginUser} from "../login/loginSlice";
import {useDispatch, useSelector} from "react-redux";
import Badge from '@mui/material/Badge';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import postCustomer from "../../fetch/postCustomer";
import Swal from "sweetalert2";
import {allCard} from "../main/productsList/productsListSlice";
import {clearCard} from "../main/productsList/productsListSlice";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import {Avatar} from "@mui/material";
const Navi = () => {
    const [isLogin, setIsLogin] = useState("");
    const location = useLocation();
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [anchorEl, setAnchorEl] = useState(null)
    const user = useSelector(loginUser)
    const card = useSelector(allCard)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (window.location.pathname.includes("login")) {
            setIsLogin("d-none");
        } else {
            setIsLogin("");
        }
    }, [location.pathname]);

    useEffect(() => {
        window.onresize = () => {
            setInnerWidth(window.innerWidth)
            console.log(window.innerWidth)
        }
    }, [])


    const logOutHandler = () => {
        dispatch(addLoggedUser({}))
        postCustomer({}, "loggedCustomer").then(r => console.log(r))
        dispatch(clearCard({}))
        Swal.fire({
            icon: 'warning',
            title: "Logged Out",
            showConfirmButton: false,
            timer: 1500
        }).then(r => console.log(r))
        navigate("/", {replace: true})
    }


    const renderLoginButton = () => {
        if (Object.keys(user).length === 0) {
            return (
                <Link to={"/login"} className={"linkTo"}>
                    <Button variant="outlined" className={`navbarLogin-btn ${isLogin}`}>
                        Login
                    </Button>
                </Link>
            )
        } else {
            if (innerWidth < 750) {
                return (
                    <div>
                        <Button
                            id="fade-button"

                            onClick={(e) => {
                                setAnchorEl(e.currentTarget)

                            }}
                        >
                            <MenuIcon/>
                        </Button>
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => {
                                setAnchorEl(null)
                            }}

                        >
                            <MenuItem >{user.name}</MenuItem>
                            <MenuItem >
                                <Badge color="error" badgeContent={Object.keys(card).length} max={9}>
                                    <CardTravelOutlinedIcon className={"navbar-card"} onClick={() => {
                                        navigate("/cardSummary")
                                    }}/>
                                </Badge>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                setAnchorEl(null)
                            }}><LogoutIcon className={"log-out-btn"} onClick={logOutHandler}/></MenuItem>
                        </Menu>
                    </div>
                )
            } else {
                return (
                    <div className={"navbar-profile-container"}>
                        <div>
                            <Badge color="error" badgeContent={Object.keys(card).length} max={9}>
                                <CardTravelOutlinedIcon className={"navbar-card"} onClick={() => {
                                    navigate("/cardSummary")
                                }}/>
                            </Badge>
                        </div>
                        <div>
                            <Avatar>{user.name[0]}</Avatar>
                        </div>
                        <div>
                            <LogoutIcon className={"log-out-btn"} onClick={logOutHandler}/>
                        </div>

                    </div>
                )
            }
        }
    }


    const renderMobile = () => {
        return (
            <div
                className={
                    "nav-container d-flex align-items-center justify-content-between"
                }
            >
                <Link to={"/"}>
                    <img src={navbarLogo} alt="" className={"navbarLogo"}/>
                </Link>

                <SearchIcon className={"search-icon"}/>
                {renderLoginButton()}
            </div>
        );
    };
    const renderTablet = () => {
        return (
            <div
                className={
                    "nav-container d-flex align-items-center justify-content-between"
                }
            >
                <div className={"d-flex align-items-center "}>
                    <Link to={"/"}>
                        <img src={navbarLogo} alt="" className={"navbarLogo"}/>
                    </Link>
                    <form className={"search-form"}>
                        <input className={"searchInput"} placeholder={"Search Here"}/>
                        <SearchIcon className={"search-icon"}/>
                    </form>
                </div>
                {renderLoginButton()}

            </div>
        );
    };


    if (innerWidth < 750) {
        return renderMobile();
    } else {
        return renderTablet();
    }

    
};

export default Navi;
