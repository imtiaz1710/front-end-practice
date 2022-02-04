import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeamById(id: number): Observable<Team> {
    return <Observable<Team>>this.http.get(`http://localhost:3000/teams/${id}`);
  }

  getAllTeams(): Observable<Team[]> {
    return <Observable<Team[]>>this.http.get(`http://localhost:3000/teams`);
  }

  getAllTeamsPromise(): Promise<Team[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`http://localhost:3000/teams`)
        .subscribe({
          next: (teams: Team[]) => resolve(teams),
          error: (err) => reject(err)
        });
    });
  }
}
