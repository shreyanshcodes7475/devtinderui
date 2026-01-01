import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./Userslice"

const Appstore=configureStore({
    reducer:{
        user:useReducer
    }
});
export default Appstore;