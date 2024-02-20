import { configureStore } from "@reduxjs/toolkit";
import accountsSlice from "./accounts/reducer";
import transactionSlice from "./transactions/reducer";

const makeStore = () =>
    configureStore({
        reducer: {
            accounts: accountsSlice.reducer,
            transactions: transactionSlice.reducer,
        },
    });

export type StoreType = ReturnType<typeof makeStore>;
export type RootState = ReturnType<StoreType["getState"]>;
export type AppDispatch = StoreType["dispatch"];

export default makeStore();
