import { createSlice } from "@reduxjs/toolkit";

const Connectionsslice=createSlice({
    name:"Connection",
    initialState:null,
    reducers:{
        addConnections:(state, action)=>{
            return action.payload;
        },

        removeConnections:()=>{
            return null;
        }
    }
})

export const {addConnections,removeConnections}=Connectionsslice.actions;
export default Connectionsslice.reducer;