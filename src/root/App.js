import React, { useEffect, useState } from "react";
import Navi from "../features/navigation/Navi";
import Main from "../features/main/Main";
import Footer from "../features/footer/Footer";
import Login from "../features/login/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import Register from "../features/register/Register";
import ProductDetail from "../features/main/productDetail/ProductDetail";
import { addAllProducts } from "../features/main/productsList/productsListSlice";
import { useDispatch } from "react-redux";
import {addLoggedUser} from "../features/login/loginSlice";
import CardSummary from "../features/main/productsList/CardSummary";
import AllProducts from "../features/main/productsList/AllProducts";

const App = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    get("products").then((r) => dispatch(addAllProducts(r)));
    get("loggedCustomer").then((r)=>{
      dispatch(addLoggedUser(r))
    })
  }, [App]);

  const get = async (paramsLink) => {
    let link="http://localhost:3000/";
    if(paramsLink){
      link+=paramsLink;
    }
    try {
      let request = await fetch(link);
      return request.json();
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <div>
      <Navi />
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={`/product/:userId`} element={<ProductDetail />} />
        <Route path={"/cardSummary"} element={<CardSummary/>}/>
        <Route path={"/allProducts"} element={<AllProducts/>}/>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
