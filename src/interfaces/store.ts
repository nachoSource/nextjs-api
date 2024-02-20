import { Account } from "./accounts";
import { Transaction } from "./transactions";

export interface AccountsState {
    accounts: Account[];
    currentAccount: Account;
    requestedAccount: Account;
}

export interface TransactionState {
    lastTransaction: Transaction;
    pendingTransaction: Transaction;
    pending: boolean;
    success: boolean;
    error: string;
}
