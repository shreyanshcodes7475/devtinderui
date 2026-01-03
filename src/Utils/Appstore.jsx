import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./Userslice"
import feedReducer from "./Feedslice"

const Appstore=configureStore({
    reducer:{
        user:useReducer,
        feed: feedReducer
    }
});
export default Appstore;