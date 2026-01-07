import { createSlice } from "@reduxjs/toolkit";

const Requestsslcie=createSlice({
    name:"Requests",
    initialState: null,
    reducers:{
        addRequest:(state,action)=>{
            return action.payload;
        },

        removeRequest:(state,action)=>{
            const newArray=state.filter((req)=>req._id!=action.payload);
            return newArray;
            
        }
    }
})

export const{addRequest,removeRequest} =Requestsslcie.actions;
export default Requestsslcie.reducer;