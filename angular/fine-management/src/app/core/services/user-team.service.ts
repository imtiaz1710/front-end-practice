import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserTeam } from '../models/user-team';

@Injectable({
  providedIn: 'root',
})
export class UserTeamService {
  constructor(private http: HttpClient) {}

  addUserTeam(userTeam: UserTeam): Observable<UserTeam> {
    return this.http.post<UserTeam>(`https://localhost:44341/api/UserTeam`, userTeam);
  }

  updateUserTeam(id: number, userTeam: UserTeam): Observable<UserTeam> {
    return this.http.put<UserTeam>(`https://localhost:44341/api/UserTeam/${id}`, userTeam);
  }

  getAllUserTeams(): Observable<UserTeam[]> {
    return this.http.get<UserTeam[]>(`https://localhost:44341/api/UserTeam`);
  }

  deleteUserTeam(id: number): Observable<number> {
    return this.http.delete<number>(`https://localhost:44341/api/UserTeam/${id}`);
  }
}
