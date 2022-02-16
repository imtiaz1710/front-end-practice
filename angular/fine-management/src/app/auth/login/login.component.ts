import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserTeam } from 'src/app/models/user-team';
import { UserTeamService } from 'src/app/services/user-team.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  userTeams: UserTeam[] = [];
  submitted: boolean = false;

  constructor(
    private userTeamService: UserTeamService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toasterService: ToastrService
  ) {}

  get loginFormControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]],
    });

    this.userTeamService.getAllUserTeams().subscribe({
      next: res => this.userTeams = res,
      error: err => console.log(err)
    })
  }

  login() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.submitted = false;
      this.http.get<any>('http://localhost:3000/users').subscribe({
        next: (res) => {
          const user = res.find(
            (x: any) =>
              x.email === this.loginForm.value.email &&
              x.password === this.loginForm.value.password
          );

          if (user && this.userTeams.find(ut => ut.userId == user.id)) {
            this.toasterService.success('Log in Success!');
            this.loginForm.reset();
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/main/dashboard']);
          } else {
            if (!user) this.toasterService.error('User not Found');
            else{
              this.toasterService.error('Access Denied!');
            }
          }
        },
        error: (err) => this.toasterService.error('Error!'),
      });
    }
  }
}
