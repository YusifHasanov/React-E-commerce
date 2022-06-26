import {createSlice} from "@reduxjs/toolkit";




const loginSlice = createSlice({
    name: "login",
    initialState:{
        loginUser: {}
    },
    reducers: {
        addLoggedUser:(state,action)=>{
            state.loginUser=action.payload
        },

       
    },

    extraReducers: {}

})


export const loginUser = (state) => state.login.loginUser

export const {addLoggedUser}=loginSlice.actions



export default loginSlice.reducer