import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  private json = <string>localStorage.getItem('user');
  user : User = JSON.parse(this.json);

  viewMode : boolean = true;
  constructor() {}

  ngOnInit(): void {}

  onClick()
  {
    this.viewMode = !this.viewMode;
  }
}
