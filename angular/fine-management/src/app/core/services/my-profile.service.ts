import { Observable } from 'rxjs';
import { UserTeam } from './../models/user-team';
import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { User } from '../models/user';
import { TeamService } from './team.service';
import { UserTeamService } from './user-team.service';

@Injectable({
  providedIn: 'root',
})
export class MyProfileService {
  constructor(
    private userTeamService: UserTeamService,
    private teamService: TeamService
  ) {}

  getProfile(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public async getMyActiveTeamsAsync() {
    let teams: Team[];
    let userTeams: UserTeam[];
    let myTeams: Team[];

    const myProfile = this.getProfile();

    await this.teamService.getAllTeams().subscribe({
      next: (ts) => (teams = ts),
      error: (err) => console.log(err),
    });

    await this.userTeamService.getAllUserTeams().subscribe({
      next: (uts) => (userTeams = uts),
      error: (err) => console.log(err),
    });

    userTeams
      .filter((ut) => ut.isActive && ut.userId == myProfile.id)
      .forEach((ut) => myTeams.push(teams.find((t) => t.id == ut.teamId)));

    return  myTeams;
  }

  // private getActiveUserTeamByUserIdPromise(userId: number) {
  //   return new Promise((resolve, reject) => {
  //     this.userTeamService.getUserTeamByUserId(userId).subscribe({
  //       next: (userTeams) => resolve(userTeams.filter((x) => x.isActive)),
  //       error: (err) => reject(err),
  //     });
  //   });
  // }

  // private getTeamByIdPromise(teamId: number) {
  //   return new Promise((resolve, reject) => {
  //     this.teamService.getTeamById(teamId).subscribe({
  //       next: (team) => resolve(team),
  //       error: (err) => reject(err),
  //     });
  //   });
  // }
}
