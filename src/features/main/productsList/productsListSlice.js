import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allProducts: [],
    selectedProduct: {},
    card:[]
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addSelectedProduct: (state, action) => {
            console.log(action.payload)
            state.selectedProduct=(action.payload)
        },
        addAllProducts:(state,action) => {
            state.allProducts.push(action.payload)
        },
        addToCard:(state,action)=>{
            let foundProduct = state.card.find(findObjs => (findObjs.product.id === action.payload.id ))
            if (foundProduct) {
                foundProduct.quantity += 1;
            } else {
                state.card.push({product: action.payload, quantity: 1})
            }
        },
        clearCard:(state,action)=>{
            state.card=[]
        },
        decreaseQuantity:(state,action)=>{
            let foundProduct =state.card.find(product=>product.product.id === action.payload.product.id)
            foundProduct.quantity-=1;
        }
        ,
        clearOneCard:(state,action)=>{
            state.card=state.card.filter(product=>product.product.id !==action.payload.product.id);
        }
    },

    extraReducers: {}
})

export const allCard=(state)=>state.products.card

export const selectedProduct=(state)=>state.products.selectedProduct

export const allProducts =(state)=>state.products.allProducts

export const {clearCard}=productsSlice.actions

export const {clearOneCard}=productsSlice.actions

export const {decreaseQuantity}=productsSlice.actions

export const {addToCard}=productsSlice.actions

export const {addSelectedProduct}=productsSlice.actions

export const {addAllProducts}=productsSlice.actions


export default productsSlice.reducer