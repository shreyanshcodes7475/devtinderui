import { createSlice } from "@reduxjs/toolkit";

const Feedslice=createSlice({
    name:"feed",
    initialState: null,
    reducers:{
        addFeed: (state,action)=>{
            return action.payload;       
        },
        removeUserFromFeed:(state,action)=>{
            const newFeed=state.filter((user)=>user._id!=action.payload)
            return newFeed;
        }


    }
})

export const {addFeed,removeUserFromFeed}=Feedslice.actions;
export default Feedslice.reducer;