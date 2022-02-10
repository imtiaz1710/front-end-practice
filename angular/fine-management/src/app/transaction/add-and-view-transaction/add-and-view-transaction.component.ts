import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-and-view-transaction',
  templateUrl: './add-and-view-transaction.component.html',
  styleUrls: ['./add-and-view-transaction.component.scss']
})
export class AddAndViewTransactionComponent implements OnInit {
  rows = [
    { name: 'Austin', fineType: 'Scrum', amount: 100, date: '2/2/3' },
    {
      name: 'Imtiaz',
      fineType: 'Team Meeting',
      amount: 200,
      date: '2/2/3',
    },
    {
      name: 'Mehedi',
      fineType: 'Team Meeting',
      amount: 200,
      date: '5/2/3',
    },
    { name: 'Austin', fineType: 'Scrum', amount: 100, date: '2/2/3' },
    {
      name: 'Imtiaz',
      fineType: 'Team Meeting',
      amount: 200,
      date: '2/2/3',
    },
    {
      name: 'Mehedi',
      fineType: 'Team Meeting',
      amount: 200,
      date: '5/2/3',
    }
  ];

  columns = [
    { prop: 'name' },
    { prop: 'fineType' },
    { name: 'Amount' },
    { name: 'date' },
  ];
  constructor() { }

  ngOnInit(): void {
  }
}
