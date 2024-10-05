import { createSlice } from "@reduxjs/toolkit";

// to represent whether the app is loading or not, along with a message to display

const initialState = {
        categories: [],
        groups: [],
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
                }
        }
} )

export default customizationSlice.reducer
export const { setCategories, setGroups } = customizationSlice.actions
