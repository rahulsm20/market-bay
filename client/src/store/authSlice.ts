import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authenticated: false,
    user:{
      username:"",
      email:""
    }
  };
  
  const filterSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthenticated:(state,action)=>{
            state.authenticated = action.payload
        },
        setUser:(state,action)=>{
          state.user = action.payload
        }
    }
  });
  
  export const { setAuthenticated,setUser } = filterSlice.actions;
  export default filterSlice.reducer;
  