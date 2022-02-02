import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getMyTeams(): Team[] {
    let teamsOfUser = <Team[]>[];

    this.userTeamService.getUserTeamByUserId(this.getProfile().id).subscribe({
      next: (userTeams) => {
        let activeUserTeams = userTeams.filter((u) => u.isActive == true);

        activeUserTeams.map((x) => {
          this.teamService.getTeamById(x.teamId).subscribe((team) => {
            teamsOfUser.push(team);
          });
        });
      },
      error: (err) => console.log(err),
    });
    
    return teamsOfUser;

    // let teams: Observable<Team>[];

    // this.userTeamService
    //   .getUserTeamByUserId(this.getProfile().id)
    //   .subscribe({
    //     next: (userTeams) => {
    //     console.log("Imtiaz: ",userTeams)
    //       userTeams.forEach((userTeam) => {
    //         if (userTeam.isActive) {
    //           teams.push(
    //             this.teamService.getTeamById(userTeam.teamId)
    //           );
    //         }
    //       });
    //     },
    //   });

    // console.log(teams);
    // return teams;
  }
}
