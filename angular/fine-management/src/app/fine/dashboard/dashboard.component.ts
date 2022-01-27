import { Component, OnInit } from '@angular/core';
import { AccessChecker } from 'src/app/shared/access-checker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private accessCheck : AccessChecker) { }
  ngOnInit(): void {
    this.accessCheck.preventUnauthorizedAccess();
  }
}
