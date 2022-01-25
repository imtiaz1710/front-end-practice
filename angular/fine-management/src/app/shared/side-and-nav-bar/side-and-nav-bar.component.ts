import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-side-and-nav-bar',
  templateUrl: './side-and-nav-bar.component.html',
  styleUrls: ['./side-and-nav-bar.component.scss'],
})
export class SideAndNavBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
}
