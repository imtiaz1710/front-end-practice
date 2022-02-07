export interface Fine {
    id: number;
    userTeamId: number;
    fineType: string;
    fineAmount: number;
    dateTime: Date;
    note: string;
}
