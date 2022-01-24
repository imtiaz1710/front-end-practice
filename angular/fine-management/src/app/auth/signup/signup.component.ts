import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { TEAMS } from '../../../teams';
import { Team } from '../../../team';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public TEAMS : Team[] = TEAMS;
  public signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: [''],
      password: [''],
      confirmPassword: [''],
      team: [''],
    });
  }

  signUp() {
    this.http.post<any>('http://localhost:3000/singupUsers', this.signupForm.value)
    .subscribe({
        next: (res: any) => {
          alert('sign up successfull');
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error: (err: any) => alert('error!')
      })  
  }
}
