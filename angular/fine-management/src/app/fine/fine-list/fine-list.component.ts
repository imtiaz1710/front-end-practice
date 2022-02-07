import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fine-list',
  templateUrl: './fine-list.component.html',
  styleUrls: ['./fine-list.component.scss'],
})
export class FineListComponent implements OnInit {
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
    }
  ];

  columns = [
    { prop: 'name' },
    { prop: 'fineType' },
    { name: 'Amount' },
    { name: 'DateTime' },
    { name: 'Actions', prop: 'Id' }
  ];

  edit(value) {}

  delete(value) {}
}
