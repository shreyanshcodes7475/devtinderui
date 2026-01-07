import { createSlice } from "@reduxjs/toolkit";

const Connectionsslice=createSlice({
    name:"Connection",
    initialState:[],
    reducers:{
        addConnections:(state, action)=>{
            return action.payload;
        },

        removeConnections:()=>{
            return [];
        }
    }
})

export const {addConnections,removeConnections}=Connectionsslice.actions;
export default Connectionsslice.reducer;