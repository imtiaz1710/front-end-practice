import { Component, OnInit } from '@angular/core';
import { Fine } from 'src/app/core/models/fine';
import { Team } from 'src/app/core/models/team';
import { Transaction } from 'src/app/core/models/transaction';
import { User } from 'src/app/core/models/user';
import { UserTeam } from 'src/app/core/models/user-team';
import { FineService } from 'src/app/core/services/fine.service';
import { MyProfileService } from 'src/app/core/services/my-profile.service';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { UserTeamService } from 'src/app/core/services/user-team.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: User[];
  userTeams: UserTeam[];
  myTeams: Team[];
  usersOfmySelectedTeam: User[];
  transactions: Transaction[];
  fines: Fine[];
  rows = [];
  filteredUserTeams: UserTeam[];
  filteredFines: Fine[];
  filteredTransactions: Transaction[];
  filteredUser: User;

  constructor(
    private userService: UserService,
    private userTeamService: UserTeamService,
    private myProfileService: MyProfileService,
    private transactionService: TransactionService,
    private fineService: FineService
  ) {}

  ngOnInit(): void {
    this.myProfileService
      .getMyActiveTeamsAsync()
      .then((ts) => (this.myTeams = ts));

    this.userService.getAllUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => console.log(err),
    });

    this.userTeamService.getAllUserTeams().subscribe({
      next: (userTeams) => (this.userTeams = userTeams),
      error: (err) => console.log(err),
    });

    this.fineService.getAllFines().subscribe({
      next: (fines) => (this.fines = fines),
      error: (err) => console.log(err),
    });

    this.transactionService.getAllTransactions().subscribe({
      next: (transactions) => (this.transactions = transactions),
      error: (err) => console.log(err),
    });
  }

  LoadUserTeamsByTeamId(teamId: number) {
    this.filteredUserTeams = this.userTeams.filter((ut) => ut.teamId == teamId);
  }

  LoadUserByUserTeam(userTeam: UserTeam) {
    this.filteredUser = this.users.find((u) => u.id == userTeam.userId);
  }

  LoadFinesByUserTeamId(userTeamId: number) {
    this.filteredFines = this.fines.filter((f) => f.userTeamId == userTeamId);
  }

  LoadTransactionsByUserTeamId(userTeamId: number) {
    this.filteredTransactions = this.transactions.filter(
      (tn) => tn.userTeamId == userTeamId
    );
  }

  calculateTotalFineByUserTeamId(userTeamId: number): number {
    this.LoadFinesByUserTeamId(userTeamId);
    let sum: number = 0;
    this.filteredFines.forEach((f) => (sum += <number>f.fineAmount));
    return sum;
  }

  calculateTotalTransactionByUserTeamId(userTeamId: number): number {
    this.LoadTransactionsByUserTeamId(userTeamId);
    let sum = 0;
    this.filteredTransactions.forEach((tn) => (sum += tn.transactionAmount));
    return sum;
  }

  calculateTotalTransactionAmountByTeamId(teamId: number): number {
    const userTeamsOfMyTeam: UserTeam[] = this.userTeams.filter(
      (ut) => ut.teamId == teamId
    );
    let transactionsOfMyTeam: Transaction[] = [];

    userTeamsOfMyTeam.forEach((ut) => {
      let transactions: Transaction[] = this.transactions.filter(
        (tn) => tn.userTeamId == ut.id
      );
      transactionsOfMyTeam.push(...transactions);
    });

    let totalTransactionAmount = 0;

    transactionsOfMyTeam.forEach(
      (tn) => (totalTransactionAmount += tn.transactionAmount)
    );

    return totalTransactionAmount;
  }

  calculateTotalFineAmountByTeamId(teamId: number): number {
    const userTeamsOfMyTeam: UserTeam[] = this.userTeams.filter(
      (ut) => ut.teamId == teamId
    );
    let finesOfMyTeam: Fine[] = [];

    userTeamsOfMyTeam.forEach((ut) => {
      let fines: Fine[] = this.fines.filter((f) => f.userTeamId == ut.id);
      finesOfMyTeam.push(...fines);
    });

    let totalFineAmount: number = 0;

    finesOfMyTeam.forEach((f) => (totalFineAmount += <number>f.fineAmount));

    return totalFineAmount;
  }
}
