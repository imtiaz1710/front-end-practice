import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  rows = [
    { name: 'Austin', fineType: 'Scrum', amount: 100, dateTime: '2/2/3' },
    {
      name: 'Imtiaz',
      fineType: 'Team Meeting',
      amount: 200,
      dateTime: '2/2/3',
    },
    {
      name: 'Mehedi',
      fineType: 'Team Meeting',
      amount: 200,
      dateTime: '5/2/3',
    },
    { name: 'Austin', fineType: 'Scrum', amount: 100, dateTime: '2/2/3' },
    {
      name: 'Imtiaz',
      fineType: 'Team Meeting',
      amount: 200,
      dateTime: '2/2/3',
    },
    {
      name: 'Mehedi',
      fineType: 'Team Meeting',
      amount: 200,
      dateTime: '5/2/3',
    },
  ];

  columns = [
    { prop: 'name' },
    { prop: 'fineType' },
    { name: 'Amount' },
    { name: 'DateTime' },
  ];
}
