import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`https://localhost:44341/api/User`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`https://localhost:44341/api/User/${id}`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`https://localhost:44341/api/User`);
  }

  deleteUser(id: number): Observable<number> {
    return this.http.delete<number>(`https://localhost:44341/api/User/${id}`);
  }
}
