import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";
import postThunk from "./postThunkSlice";

const store=configureStore({
    reducer:{
        auth:authSlice,
        postThunk:postThunk,

    }
})

export default store