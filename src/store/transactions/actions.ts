import transactionSlice from "./reducer";

export const {
    makeTransactionRequest,
    makeTransactionSuccess,
    makeTransactionFailure,
} = transactionSlice.actions;
