import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { UserTeamService } from './user-team.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private userTeamService: UserTeamService
  ) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/users/${id}`);
  }

  async getAllUsersAsync() {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  getAllUsers() {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  getAllUsersPromise(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`http://localhost:3000/users`).subscribe({
        next: (users: User[]) => resolve(users),
        error: (err) => reject(err),
      });
    });
  }
}
