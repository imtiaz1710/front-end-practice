export interface Transaction {
    id: number;
    userTeamId: number;
    transactionAmount: number;
    date: Date;
    note: string;
}
