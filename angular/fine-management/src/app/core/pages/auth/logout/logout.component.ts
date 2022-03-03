import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user'))
      localStorage.removeItem('user');

    this.router.navigate(['login']);
  }

}
