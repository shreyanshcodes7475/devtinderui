import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Userslice"
import feedReducer from "./Feedslice"
import ConnectionReducer from  "./Connectionsslice"
import  requestReducer from "./Requestsslice"

const Appstore=configureStore({
    reducer:{
        user:userReducer,
        feed: feedReducer,
        connection: ConnectionReducer,
        request: requestReducer
    }
});
export default Appstore;