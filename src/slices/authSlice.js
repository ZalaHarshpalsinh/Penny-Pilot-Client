import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userDetails: {
        _id: "",
        username: "",
        email: "",
        profilePhoto: "",
    }
}

export const authSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: ( state, action ) =>
        {
            state.isLoggedIn = action.payload
        },
        setUserDetails: ( state, action ) =>
        {
            for ( let key in state.userDetails )
            {
                state.userDetails[ key ] = action.payload[ key ];
            }
        }
    }
} )

export default authSlice.reducer;

export const { setIsLoggedIn, setUserDetails } = authSlice.actions;