import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Team } from '../../models/team';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toasterService: ToastrService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      password: ['',],
      confirmPassword: ['']
    });
  }

  get signupFormControls(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  signUp() {
    this.submitted = true;

    if (this.signupForm.valid) {
      this.submitted = false;
      this.http
        .post<any>('http://localhost:3000/users', this.signupForm.value)
        .subscribe({
          next: (res: any) => {
            this.toasterService.success('Sign up Successful!');
            this.signupForm.reset();
            this.router.navigate(['login']);
          },
          error: (err: any) => this.toasterService.error('Error!'),
        });
    }
  }
}
