import React, { useEffect, useState } from "react";
import Navi from "./features/navigation/Navi";
import Main from "./features/main/Main";
import Footer from "./features/footer/Footer";
import Login from "./features/login/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import Register from "./features/register/Register";
import ProductDetail from "./features/main/productDetail/ProductDetail";
import { addAllProducts } from "./features/main/productsList/productsListSlice";
import { useDispatch } from "react-redux";

const App = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    get().then((r) => dispatch(addAllProducts(r)));
  }, [App]);

  const get = async () => {
    try {
      let request = await fetch("http://localhost:3000/products");
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
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
