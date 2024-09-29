import { configureStore } from "@reduxjs/toolkit";

import { authReducer, loaderReducer, toasterReducer } from "../slices"

const store = configureStore( {
    reducer: {
        auth: authReducer,
        loader: loaderReducer,
        toaster: toasterReducer,
    }
} )

export default store