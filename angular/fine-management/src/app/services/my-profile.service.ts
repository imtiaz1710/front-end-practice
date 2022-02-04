import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { UserTeam } from '../models/user-team';
import { User } from '../user/user';
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

  // async getMyTeams() : Promise<Team[]>
  // {
  //   let myTeams: Team[];
  //   await this.getMyTeamsPromise().then((teams) => {myTeams = teams});
  //   return myTeams;
  // }

  public getMyTeamsPromise() : Promise<Team[]> {

    return new Promise((resolve, reject) => {
        let getTeamByIdpromises = [];
        this.getActiveUserTeamByUserIdPromise(this.getProfile().id).then(
          (userTeams: UserTeam[]) => {
            userTeams.forEach((userTeam) => {
              getTeamByIdpromises.push(
                this.getTeamByIdPromise(userTeam.teamId)
              );
            });
            Promise.all(getTeamByIdpromises).then((teams: Team[]) => resolve(teams), (err) => reject(err));
          }
        );
    })
  }

  private getActiveUserTeamByUserIdPromise(userId : number)
  {
    return new Promise((resolve, reject) => {
      this.userTeamService.getUserTeamByUserId(userId)
        .subscribe({
          next: (userTeams) => resolve(userTeams.filter(x => x.isActive)),
          error: (err) => reject(err)
        })
    })
  }

  private getTeamByIdPromise(teamId: number)
  {
    return new Promise((resolve, reject) => {
      this.teamService.getTeamById(teamId).subscribe({
        next: (team) => resolve(team),
        error: (err) => reject(err)
      })
    })
  }
}
