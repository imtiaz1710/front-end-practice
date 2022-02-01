import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { UserTeamService } from './user-team.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private userTeamService: UserTeamService) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/users/${id}`);
  }

  // getUsersByTeam(teamId: number) {
  //   this.userTeamService.getUserTeamByTeamId(teamId)
  // }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }
}
