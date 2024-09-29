import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
        message: "",
        type: "success"
}

export const toasterSlice = createSlice( {
        name: "toaster",
        initialState,
        reducers: {
                setMessage: ( state, action ) =>
                {
                        state.message = action.payload.message
                        state.type = action.payload.type

                        state.type === "error" ? toast.error( state.message ) : toast.success( state.message )
                }
        }
} )

export default toasterSlice.reducer

export const { setMessage } = toasterSlice.actions
