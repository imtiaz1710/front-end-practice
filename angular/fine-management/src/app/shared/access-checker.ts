import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserTeam } from '../core/models/user-team';
import { UserTeamService } from '../core/services/user-team.service';

@Injectable()
export class AccessChecker {

    constructor(private router: Router, private userTeamService: UserTeamService) { }

    async preventUnauthorizedAccess() {
        const user = localStorage.getItem('user');

        if (!user) {
            this.router.navigate(['/']);
        }
    }
}
