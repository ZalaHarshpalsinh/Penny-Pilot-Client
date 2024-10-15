import { configureStore } from "@reduxjs/toolkit";

import { authReducer, loaderReducer, toasterReducer, customizationReducer, transactionReducer } from "../slices"

const store = configureStore( {
    reducer: {
        auth: authReducer,
        loader: loaderReducer,
        toaster: toasterReducer,
        customization: customizationReducer,
        transaction: transactionReducer,
    }
} )

export default store