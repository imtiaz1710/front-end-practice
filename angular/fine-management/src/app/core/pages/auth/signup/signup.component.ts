import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import Validation from '../validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  users: User[] = [];
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private router: Router,
    private toasterService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.maxLength(20)]],
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(320)],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );

    this.userService.getAllUsers().subscribe({
      next: (res) => (this.users = res),
      error: (err) => console.log(err),
    });
  }

  get signupFormControls(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  signUp() {
    this.submitted = true;

    if (this.users.find((u) => u.email === this.signupForm.value.email)) {
      this.signupFormControls['email'].setErrors({ duplicate: true });
    }

    if (this.signupForm.valid) {
      this.submitted = false;
      this.userService.addUser(this.signupForm.value).subscribe({
        next: (u) => {
          this.toasterService.success('Sign up Successful!');
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => this.toasterService.error('Error!'),
      });
    }
  }
}
