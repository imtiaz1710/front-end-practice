import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fine } from '../models/fine';

@Injectable({
  providedIn: 'root',
})
export class FineService {
  constructor(private http: HttpClient) { }

  addFine(fine: Fine): Observable<Fine> {
    return <Observable<Fine>>(
      this.http.post(`http://localhost:3000/fines`, fine)
    );
  }

  updateFine(id: number, fine: Fine): Observable<Fine> {
    return <Observable<Fine>>this.http.put(`http://localhost:3000/fines/${id}`, fine);
  }

  getAllFines(): Observable<Fine[]> {
    return <Observable<Fine[]>>this.http.get(`http://localhost:3000/fines`);
  }

  deleteFine(id: number): Observable<Fine[]>
  {
    return <Observable<Fine[]>>this.http.delete(`http://localhost:3000/fines/${id}`);
  }
}
