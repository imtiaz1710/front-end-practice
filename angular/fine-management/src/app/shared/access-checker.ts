import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserTeam } from '../models/user-team';
import { UserTeamService } from '../services/user-team.service';

@Injectable()
export class AccessChecker {

    constructor(private router: Router, private userTeamService: UserTeamService) {}

    async preventUnauthorizedAccess() {
        let userTeams: UserTeam[];

        await this.userTeamService.getAllUserTeams().subscribe({
            next: res => userTeams = res,
            error: err => console.log(err)
        })
        
        const user = localStorage.getItem('user');

        if (!(user && userTeams.find(ut => ut.userId == user['id'])))
        {
            this.router.navigate(['/']);
        }
    }
}
