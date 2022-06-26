import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {addSelectedProduct, addToCard, selectedProduct} from "../productsList/productsListSlice";
import {useSelector,useDispatch} from "react-redux";
import {FadeLoader} from "react-spinners";
import "./productDetail.css";
import {allProducts} from "../productsList/productsListSlice";
import postCustomer from "../../../fetch/postCustomer";
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import Swal from "sweetalert2";
import {loginUser} from "../../login/loginSlice";
const ProductDetail = () => {
    let {userId} = useParams();
    let product = useSelector(selectedProduct);
    const [productLine, setProductLine] = useState(window.innerWidth<1200?4:6)
    const products = useSelector(allProducts)
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const user=useSelector(loginUser)
    useEffect(() => {
     window.onresize=()=>{
         if (window.innerWidth < 1200) {
             setProductLine(4)
         } else {
             setProductLine(6);
         }
         console.log(window.innerWidth)
     }
    }, [ProductDetail])

    const toProductPage = (paramsProduct) => {
        dispatch(addSelectedProduct(paramsProduct));
        postCustomer(paramsProduct, "selectedProduct").then((r) => console.log(r));
        navigate(`/product/${paramsProduct.id}`,{replace:true});
    };

    const addProductToCard = (paramsProduct) => {
        if(Object.keys(user).length===0){
            Swal.fire({
                icon: 'info',
                title: "Login to buy anything",
                showConfirmButton: false,
                timer: 1500
            }).then(r => console.log(r))
        }else{
            dispatch(addToCard(paramsProduct))
        }
    }



    const renderProductDetail = () => {
        if (Object.keys(product).length === 0) {
            return (
                <div className={"w-100 d-flex justify-content-center"}>
                    <FadeLoader/>
                </div>
            );
        } else {
            return (
                <div >
               <div className="product-top ">
                   <div>
                       <img src={product.url} alt="" className={"product-top-img"}/>
                   </div>
                   <div className={"about-product-container"}>
                       <p className={"product-name"}>{product.name}
                           <AddCardRoundedIcon className={"add-to-card"} color={"error"} onClick={()=>addProductToCard(product)} />
                       </p>
                       <p className={"product-price"}>${product.price}</p>
                       <p className={"product-text"}>{product.about}</p>
                   </div>
               </div>
                    <div className={"similar-products-container"}>

                        <div>
                            <h3 className={"similar-products-header"}>Similar Products</h3>
                            <div className={"products-box"}>
                                {
                                    products[0][product.category].map(p => {

                                        if (p.id <= productLine) {
                                            return (
                                                <div
                                                    className={
                                                        " d-flex flex-column align-items-center "
                                                    }
                                                    key={p.id}
                                                >
                                                    <div>

                                                        <div className={"product-description"}>
                                                            <img src={p.url} className={"product-img"} alt=""/>
                                                            <p className={"productName"}>{p.name}</p>
                                                            <p className={"product-price"}>${p.price}</p>
                                                            <p
                                                                className={"seeProduct"}
                                                                onClick={() => {
                                                                    toProductPage(p);
                                                                }}
                                                            >
                                                                See Product
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            );
        }
    };

    return renderProductDetail();
};

export default ProductDetail;
