import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserTeam } from '../models/user-team';

@Injectable({
  providedIn: 'root',
})
export class UserTeamService {
  constructor(private http: HttpClient) {}

  getUserTeamByTeamId(teamId: number): Observable<UserTeam[]> {
    return this.http.get<UserTeam[]>(
      `http://localhost:3000/userTeam?teamId=${teamId}`
    );
  }

  getUserTeamByUserId(userId: number): Observable<UserTeam[]> {
    return this.http.get<UserTeam[]>(
      `http://localhost:3000/userTeam?userId=${userId}`
    );
  }
}
