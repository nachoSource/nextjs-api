import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TransactionState } from "../../interfaces/store";
import { Transaction } from "../../interfaces/transactions";

const initialState: TransactionState = {
    lastTransaction: null,
    pendingTransaction: null,
    pending: false,
    success: false,
    error: null,
};

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        makeTransactionRequest: (state, action: PayloadAction<any>) => {
            // TODO use this when BE is implemented
            // const res =  api.post('/transactions', { action.payload.transaction}).then(...);
            state.pending = true;
            state.success = false;
            state.error = null;
            state.pendingTransaction = action.payload.transaction;
            console.log("makeTransaction pending:", state.pendingTransaction);
        },
        makeTransactionSuccess: (state, action: PayloadAction) => {
            state.pending = false;
            state.success = true;
            state.error = null;
            state.lastTransaction = state.pendingTransaction;
            state.pendingTransaction = null;
            console.log("makeTransaction success:", state.lastTransaction);
        },
        makeTransactionFailure: (state, action: PayloadAction<any>) => {
            state.pending = false;
            state.success = false;
            state.error = action.payload.error;
            console.log("makeTransaction error", state.error);
        },
    },
});

export default transactionSlice;
