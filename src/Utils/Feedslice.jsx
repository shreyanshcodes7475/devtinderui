import { createSlice } from "@reduxjs/toolkit";

const Feedslice=createSlice({
    name:"feed",
    initialState: null,
    reducers:{
        addFeed: (state,action)=>{
            return action.payload;       
        },
        removeFeed:()=>{
            return [];
        }


    }
})

export const {addFeed,removeFeed}=Feedslice.actions;
export default Feedslice.reducer;