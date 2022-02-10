import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }
  
  addTransaction(transaction: Transaction): Observable<Transaction> {
    return <Observable<Transaction>>(
      this.http.post(`http://localhost:3000/transactions`, transaction)
    );
  }

  getAllTransactions(): Observable<Transaction[]> {
    return <Observable<Transaction[]>>this.http.get(`http://localhost:3000/transactions`);
  }

  updateFine(id: number, transaction: Transaction): Observable<Transaction> {
    return <Observable<Transaction>>this.http.put(`http://localhost:3000/transactions/${id}`, transaction);
  }

  deleteFine(id: number): Observable<Transaction[]>
  {
    return <Observable<Transaction[]>>this.http.delete(`http://localhost:3000/transactions/${id}`);
  }
}
