import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Account } from "../../interfaces/accounts";
import { AccountsState } from "../../interfaces/store";
// import api from "../../api";

const initialState: AccountsState = {
    accounts: [],
    currentAccount: null,
    requestedAccount: null,
};

const accountsSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        createAccount: (state, action: PayloadAction<any>) => {
            const idsArr = state.accounts.map((e: Account) => e.id);
            // TODO use this when BE is implemented & add request, success & failure
            // const { id } =  api.post('/accounts', {action.payload.email, action.payload.name}).then(...);
            const newAccount = {
                ...action.payload,
                id: !!idsArr.length ? Math.max(...idsArr) + 1 : 1,
            } as Account;
            state.accounts.push(newAccount);
        },
        getAccountBalance: (state, action: PayloadAction<number>) => {
            // TODO use this when BE is implemented
            // const id =  api.get('/accounts/{action.payload.id}/balance').then(...);
        },
        setAccountBalance: (state, action: PayloadAction<any>) => {
            const index = state.accounts.findIndex(
                ({ email }) => email === action.payload.email,
            );
            state.accounts[index] = {
                ...state.accounts[index],
                balance: action.payload.balance,
            };
            // TODO search for a cleaner way to do this
            state.currentAccount = state.accounts[index];
        },
        setCurrentAccount: (state, action: PayloadAction<string>) => {
            state.currentAccount = state.accounts.filter(
                ({ email }) => email === action.payload,
            )[0]; // TODO replace this by Arr.find
        },
    },
});

export default accountsSlice;
