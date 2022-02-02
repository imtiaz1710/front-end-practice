import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
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

  getMyTeams() : Observable<Team>[] {
    let teams: Observable<Team>[];

    this.userTeamService
      .getUserTeamByUserId(this.getProfile().id)
      .subscribe({
        next: (userTeams) => {
          userTeams.forEach((userTeam) => {
            if (userTeam.isActive) {
              teams.push(
                this.teamService.getTeamById(userTeam.teamId)
              );
            }
          });
        },
      });

    return teams;
  }
}
