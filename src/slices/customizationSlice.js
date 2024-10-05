import { createSlice } from "@reduxjs/toolkit";

// to represent whether the app is loading or not, along with a message to display

const initialState = {
        categories: [],
        groups: [],
        moneyPools: [],
        friends: [],
}

export const customizationSlice = createSlice( {
        name: "customization",
        initialState,
        reducers: {
                setCategories: ( state, action ) =>
                {
                        state.categories = action.payload
                },
                setGroups: ( state, action ) =>
                {
                        state.groups = action.payload
                },
                setMoneyPools: ( state, action ) =>
                {
                        state.moneyPools = action.payload
                },
                setFriends: ( state, action ) =>
                {
                        state.friends = action.payload
                },
        }
} )

export default customizationSlice.reducer
export const { setCategories, setGroups, setMoneyPools, setFriends } = customizationSlice.actions
