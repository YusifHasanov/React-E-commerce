import React, {useEffect, useLayoutEffect, useState} from "react";
import "./productList.css";
import {ArrowRight} from "react-bootstrap-icons";
import {FadeLoader} from "react-spinners";
import {useDispatch, useSelector} from "react-redux";
import {addSelectedProduct} from "./productsListSlice";
import postCustomer from "../../../fetch/postCustomer";
import {useNavigate} from "react-router-dom";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import {addToCard} from "./productsListSlice";
import {loginUser} from "../../login/loginSlice";
import Swal from "sweetalert2";
import {IconButton} from "@mui/material";





const ProductList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allProduct, setAllProduct] = useState([]);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth < 1200 ? 4 : 6);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(loginUser)

    useEffect(() => {
        setIsLoading(true);
        setIsLoading(false);
        get().then((r) => setAllProduct(r));

        window.onresize = () => {
            if (window.innerWidth < 1200) {
                setInnerWidth(4);
            } else {
                setInnerWidth(6);
            }

            console.log(window.innerWidth)
        };
    }, [ProductList]);

    const get = async () => {
        try {
            let request = await fetch("http://localhost:3000/products");
            return request.json();
        } catch (err) {
            throw new Error(err);
        }
    };

    const toProductPage = (paramsProduct) => {
        console.log(paramsProduct);
        dispatch(addSelectedProduct(paramsProduct));
        postCustomer(paramsProduct, "selectedProduct").then((r) => console.log(r));
        navigate(`/product/${paramsProduct.id}`);
    };



    const addProductToCard = (paramsProduct) => {

        if (Object.keys(user).length === 0) {

            Swal.fire({
                icon: 'info',
                title: "Login to buy anything",
                showCancelButton: true,
                confirmButtonText: 'Login',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login")
                }

            })
        } else {
            dispatch(addToCard(paramsProduct))

        }
    }


    const renderProducts = (paramsProduct) => {
        let zero = 0;
        return (
            <div>

                <div>
                    <div
                        className={"d-flex align-items-center justify-content-between product-header"}>
                        <h3>
                            {paramsProduct === "starWars" ? "Star wars" : null}
                            {paramsProduct === "consoles" ? 'Consoles' : null}
                            {paramsProduct === "diverse" ? "Diverse" : null}
                        </h3>
                        <p onClick={() => {
                            navigate("/allProducts")
                        }}> See All <ArrowRight/></p>
                    </div>
                    <div className={"product-container"}>
                        {allProduct[paramsProduct].map((item) => {
                            {
                                zero += 1
                            }
                            if (zero <= innerWidth) {
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
                                                toProductPage(item);
                                            }}
                                        >
                                            See Product
                                        </p>
                                    </div>
                                </div>);
                            }
                        })}
                    </div>

                </div>

            </div>
        );
    };


    if (Object.keys(allProduct).length !== 0) {
        return (
            <>
                {
                    ["starWars", "consoles", "diverse"].map(i => {
                        return renderProducts(i)
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


export default ProductList;
