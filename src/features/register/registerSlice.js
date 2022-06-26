import {createSlice, nanoid} from "@reduxjs/toolkit";


const registerSlice =createSlice({
    name:"register",
    initialState:{
        customers:[],
    },
    reducers:{
        addCustomer:{
            reducer:(state,action) => {
                state.customers.push(action.payload);
            },
            prepare:(name,email,password) => {
                return {
                    payload: {
                        name,
                        email,
                        password,
                        id:nanoid(),
                    }
                };
            }
        }
    },
    extraReducers:{

    }
})

export const {addCustomer}=registerSlice.actions

export default registerSlice.reducer