import authReducer from "./authSlice"
import { setIsLoggedIn, setUserDetails } from "./authSlice"

import loaderReducer from "./loaderSlice"
import { setLoading } from "./loaderSlice"

import toasterReducer from "./toasterSlice"
import { setMessage } from "./toasterSlice"

import customizationReducer from "./customizationSlice"
import { setCategories, setGroups, setFriends, setMoneyPools } from "./customizationSlice"

import transactionReducer from './transactionSlice'
import { setTransactions } from "./transactionSlice"

export
{
    authReducer,
    setIsLoggedIn,
    setUserDetails,

    loaderReducer,
    setLoading,

    toasterReducer,
    setMessage,

    customizationReducer,
    setCategories,
    setGroups,
    setMoneyPools,
    setFriends,

    transactionReducer,
    setTransactions,
}