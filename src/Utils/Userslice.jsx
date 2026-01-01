import { createSlice } from "@reduxjs/toolkit";

const Userslice=createSlice({
    name:"user",
    initialState:null,
    reducers:{
        addUser: (state,action)=>{
            return action.payload;  //it will update a the state of the user
        },

        removeUser:(state,action)=>{
            return null;
        }


    }
})

export const{addUser,removeUser}= Userslice.actions;
export default Userslice.reducer;