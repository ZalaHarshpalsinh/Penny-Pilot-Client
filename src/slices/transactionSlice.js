import { createSlice } from "@reduxjs/toolkit";

// to represent whether the app is loading or not, along with a message to display

const initialState = {
        transactions: [],
        analysis: [],
}

export const transactionSlice = createSlice( {
        name: "transaction",
        initialState,
        reducers: {
                setTransactions: ( state, action ) =>
                {
                        state.transactions = action.payload
                },
                setAnalysis: ( state, action ) =>
                {
                        state.analysis = action.payload
                },
        }
} )

export default transactionSlice.reducer
export const { setTransactions, setAnalysis } = transactionSlice.actions
