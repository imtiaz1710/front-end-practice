import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  private json = <string>localStorage.getItem('user');
  user: User = JSON.parse(this.json);

  editForm: FormGroup;

  viewMode: boolean = true;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      name: [this.user.name],
      phoneNo: [this.user.phoneNo],
      designation: [this.user.designation],
      address: [this.user.address]
    });
  }

  onClick() {
    this.viewMode = !this.viewMode;
  }

  onEdit() {
    this.http
      .put<any>('http://localhost:3000/singupUsers', this.user)
      .subscribe({
        next: (res: any) => {
          // this.toasterService.success('Sign up Successful!');
          // this.editForm.reset();
          // this.router.navigate(['login']);
          alert('success')
        },
        // error: (err: any) => this.toasterService.error('Error!'),
        error:(err) => alert('error')
      });
  }
}
