import {configureStore} from "@reduxjs/toolkit";
import productsListSliceReducer from "./../features/main/productsList/productsListSlice"
import loginSliceReducer from "./../features/login/loginSlice";
import registerSliceReducer from "./../features/register/registerSlice";
const store = configureStore({
    reducer: {
        products: productsListSliceReducer,
        login:loginSliceReducer,
        register:registerSliceReducer
    }
})

export default store