import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id) : Observable<User>{
    return this.http.get<any>(`http://localhost:3000/singupUsers/${id}`);
  }

  
}
