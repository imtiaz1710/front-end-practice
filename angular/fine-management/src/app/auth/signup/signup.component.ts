import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user/user';
import Validation from '../validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  users: User[];
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toasterService: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]],
      confirmPassword: ['', Validators.required]
    },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      });

    this.userService.getAllUsers().subscribe({
      next: res => this.users = res,
      error: err => console.log(err)
    })
  }

  get signupFormControls(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  signUp() {
    this.submitted = true;

    if(this.users.find(u => u.email === this.signupForm.value.email))
    {
      this.signupFormControls['email'].setErrors({ duplicate: true })
      alert('duplicate')
    }

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
