import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MyProfileService } from 'src/app/services/my-profile.service';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  private json = localStorage.getItem('user');
  userId = JSON.parse(this.json).id;
  user: User;
  editForm: FormGroup;
  viewMode: boolean = true;
  myTeams: Team[] = [];

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private myProfileService: MyProfileService
  ) { }

  ngOnInit(): void {
    this.http.get<any>(`http://localhost:3000/users/${this.userId}`).subscribe({
      next: (res: any) => {
        this.user = res;
        this.editForm = this.formBuilder.group({
          name: [this.user.name],
          phoneNo: [this.user.phoneNo],
          designation: [this.user.designation],
          address: [this.user.address],
        });
      },
      error: (err: any) => this.toasterService.error('Error!'),
    });

    this.myProfileService.getMyTeamsPromise()
      .then(mts => this.myTeams = mts)
      .catch(err => console.log(err));
  }

  onClick() {
    this.viewMode = !this.viewMode;
  }

  onEdit() {
    this.user.name = this.editForm.value.name;
    this.user.designation = this.editForm.value.designation;
    this.user.phoneNo = this.editForm.value.phoneNo;
    this.user.address = this.editForm.value.address;

    this.http
      .put<any>(`http://localhost:3000/users/${this.user.id}`, this.user)
      .subscribe({
        next: (res: any) => {
          // this.user = res;
          this.toasterService.success('Profile Info Successfully Updated!');
          // this.editForm.reset();
        },
        error: (err: any) => this.toasterService.error('Error!'),
      });
  }
}
