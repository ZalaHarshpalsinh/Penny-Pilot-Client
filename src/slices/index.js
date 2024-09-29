import authReducer from "./authSlice"
import { setIsLoggedIn, setUserDetails } from "./authSlice"

import loaderReducer from "./loaderSlice"
import { setLoading } from "./loaderSlice"

import toasterReducer from "./toasterSlice"
import { setMessage } from "./toasterSlice"

export
{
    authReducer,
    setIsLoggedIn,
    setUserDetails,

    loaderReducer,
    setLoading,

    toasterReducer,
    setMessage,
}