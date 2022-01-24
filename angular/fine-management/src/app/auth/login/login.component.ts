import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    this.http.get<any>('http://localhost:3000/singupUsers').subscribe({
      next: (res) => {
        const user = res.find(
          (x: any) =>
            x.email === this.loginForm.value.email &&
            x.name === this.loginForm.value.name
        );

        if (user) {
          alert('Login Success');
          this.loginForm.reset();
          this.router.navigate(['/']);
        } else {
          alert('User not Found');
        }
      },

      error: (err) => alert('Error!'),
    });
  }
}
