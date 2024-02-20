enum TransactionTypes {
    DEPOSIT,
    WITHDRAWAL,
}

interface Transaction {
    accountId: number;
    amount: number;
    type: TransactionTypes;
}

export { TransactionTypes, type Transaction };
