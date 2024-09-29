import { createSlice } from "@reduxjs/toolkit";

// to represent whether the app is loading or not, along with a message to display

const initialState = {
        isLoading: true,
        loadingMsg: ""
}

export const loaderSlice = createSlice( {
        name: "loader",
        initialState,
        reducers: {
                setLoading: ( state, action ) =>
                {
                        state.isLoading = action.payload.isLoading
                        state.loadingMsg = action.payload.loadingMsg
                }
        }
} )

export default loaderSlice.reducer
export const { setLoading } = loaderSlice.actions
