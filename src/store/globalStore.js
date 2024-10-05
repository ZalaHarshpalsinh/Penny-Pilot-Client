import { configureStore } from "@reduxjs/toolkit";

import { authReducer, loaderReducer, toasterReducer, customizationReducer } from "../slices"

const store = configureStore( {
    reducer: {
        auth: authReducer,
        loader: loaderReducer,
        toaster: toasterReducer,
        customization: customizationReducer,
    }
} )

export default store