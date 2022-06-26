import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {FadeLoader} from "react-spinners";
import {ArrowRight} from "react-bootstrap-icons";
import {IconButton} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import {addSelectedProduct, addToCard} from "./productsListSlice";
import postCustomer from "../../../fetch/postCustomer";
import Swal from "sweetalert2";
import {loginUser} from "../../login/loginSlice";


const AllProducts = () => {

    const [allProduct, setAllProduct] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [innerWidth, setInnerWidth] = useState(window.innerWidth < 1200 ? 4 : 6);
    const user = useSelector(loginUser)
    useEffect(() => {
        get().then((r) => setAllProduct(r));

        window.onresize = () => {
            if (window.innerWidth < 1200) {
                setInnerWidth(4);
            } else {
                setInnerWidth(6);
            }

            console.log(window.innerWidth)
        };
    }, [AllProducts]);
    const get = async () => {
        try {
            let request = await fetch("http://localhost:3000/products");
            return request.json();
        } catch (err) {
            throw new Error(err);
        }
    };
    const goProductPage = (paramsProduct) => {
        console.log(paramsProduct);
        dispatch(addSelectedProduct(paramsProduct));
        postCustomer(paramsProduct, "selectedProduct").then((r) => console.log(r));
        navigate(`/product/${paramsProduct.id}`);
    };

    const addProductToCard = (paramsProduct) => {
        if (Object.keys(user).length === 0) {
            Swal.fire({
                icon: 'info', title: "Login to buy anything", showConfirmButton: false, timer: 1500
            }).then(r => console.log(r))
        } else {
            dispatch(addToCard(paramsProduct))

        }
    }


    const renderAllProducts = (params) => {

        return (
            <div>

                <div>
                    <div
                        className={"d-flex align-items-center justify-content-between product-header"}>

                    </div>
                    <div className={"product-container"}>
                        {allProduct[params].map((item) => {

                                return (<div
                                    className={"products-box d-flex flex-column align-items-center "}
                                    key={item.id}
                                >

                                    <div className={"position-relative"}>
                                        <img src={item.url} className={"product-box"} alt=""/>
                                        <span className={"add-btn-span"}>
                                        <IconButton aria-label="delete" color={"error"} size="small"
                                                    onClick={() => {
                                                        addProductToCard(item)
                                                    }}>
                                         <AddCircleRoundedIcon className={"add-btn"}/>
                                            </IconButton>

                                      </span>

                                    </div>
                                    <div>

                                        <p className={"productName"}>{item.name}</p>
                                        <p className={"product-price"}>${item.price}</p>
                                        <p
                                            className={"seeProduct"}
                                            onClick={() => {
                                                goProductPage(item);
                                            }}
                                        >
                                            See Product
                                        </p>
                                    </div>
                                </div>);

                        })}
                    </div>

                </div>

            </div>
        );
    }

    if (Object.keys(allProduct).length !== 0) {
        return (
            <>
                {
                    ["starWars", "consoles", "diverse"].map(i => {
                        return renderAllProducts(i)
                    })
                }
            </>
        )

    } else {
        return (<div className={"d-flex justify-content-center mt-4"}>
            <FadeLoader/>
        </div>);
    }
};

export default AllProducts;