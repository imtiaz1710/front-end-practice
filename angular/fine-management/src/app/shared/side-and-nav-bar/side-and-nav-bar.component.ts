import { Component, OnInit } from '@angular/core';
import { AccessChecker } from '../access-checker';


@Component({
  selector: 'app-side-and-nav-bar',
  templateUrl: './side-and-nav-bar.component.html',
  styleUrls: ['./side-and-nav-bar.component.scss'],
})
export class SideAndNavBarComponent implements OnInit {
  constructor(private accessChecker : AccessChecker) {}

  ngOnInit(): void {
    this.accessChecker.preventUnauthorizedAccess();
  }

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
}
