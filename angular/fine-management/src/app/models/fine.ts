export interface Fine {
    id: number;
    userTeamId: number;
    fineType: string;
    fineAmount: number;
    date: Date;
    note: string;
}
