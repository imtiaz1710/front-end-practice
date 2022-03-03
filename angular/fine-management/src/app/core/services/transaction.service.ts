import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`https://localhost:44341/api/Transaction`, transaction);
  }

  updateTransaction(id: number, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`https://localhost:44341/api/Transaction/${id}`, transaction);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`https://localhost:44341/api/Transaction`);
  }

  deleteTransaction(id: number): Observable<number> {
    return this.http.delete<number>(`https://localhost:44341/api/Transaction/${id}`);
  }
}
