import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fine } from '../models/fine';

@Injectable({
  providedIn: 'root',
})
export class FineService {
  constructor(private http: HttpClient) {}

  addFine(fine: Fine): Observable<Fine> {
    return this.http.post<Fine>(`https://localhost:44341/api/Fine`, fine);
  }

  updateFine(id: number, fine: Fine): Observable<Fine> {
    return  this.http.put<Fine>(`https://localhost:44341/api/Fine/${id}`, fine);
  }

  getAllFines(): Observable<Fine[]> {
    return this.http.get<Fine[]>(`https://localhost:44341/api/Fine`);
  }

  deleteFine(id: number): Observable<number> {
    return this.http.delete<number>(`https://localhost:44341/api/Fine/${id}`);
  }
}
