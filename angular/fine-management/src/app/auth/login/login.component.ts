import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    this.http.get<any>('http://localhost:3000/users').subscribe({
      next: (res) => {
        const user = res.find(
          (x: any) =>
            x.email === this.loginForm.value.email &&
            x.password === this.loginForm.value.password
        );

        if (user) {
          this.toasterService.success('Log in Success!');
          this.loginForm.reset();
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/main/dashboard']);
        } else {
          this.toasterService.error('User not Found');
        }
      },

      error: (err) => this.toasterService.error('Error!'),
    });
  }
}
