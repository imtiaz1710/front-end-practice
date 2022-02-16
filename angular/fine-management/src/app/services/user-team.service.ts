import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserTeam } from '../models/user-team';

@Injectable({
  providedIn: 'root',
})
export class UserTeamService {
  constructor(private http: HttpClient) {}

  getUserTeamByTeamId(teamId: number): Observable<UserTeam[]> {
    return this.http.get<UserTeam[]>(
      `http://localhost:3000/userTeams?teamId=${teamId}`
    );
  }

  getUserTeamByUserId(userId: number): Observable<UserTeam[]> {
    return this.http.get<UserTeam[]>(
      `http://localhost:3000/userTeams?userId=${userId}`
    );
  }

  getAllUserTeamsPromise(): Promise<UserTeam[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`http://localhost:3000/userTeams`).subscribe({
        next: (userTeams: UserTeam[]) => resolve(userTeams),
        error: (err) => reject(err)
      });
    });
  }

  getAllUserTeams(): Observable<UserTeam[]>
  {
    return this.http.get<UserTeam[]>(
      `http://localhost:3000/userTeams`
    );
  }

  addUserTeam(userTeam: UserTeam)
  {
    return this.http.post(`http://localhost:3000/userTeams`, userTeam);
  }

  updateUserTeam(userTeam: UserTeam)
  {
    return this.http.put(`http://localhost:3000/userTeams/${userTeam.id}`, userTeam);
  }
}
