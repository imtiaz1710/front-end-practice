export interface Fine {
    Id: number;
    userTeamId: number;
    fineType: string;
    fineAmount: number;
    dateTime: Date;
    note: string;
}
