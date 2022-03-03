import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MyProfileService } from 'src/app/core/services/my-profile.service';
import { Team } from 'src/app/core/models/team';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  private json = localStorage.getItem('user');
  userId: number;
  user: User;
  users: User[];
  editForm: FormGroup;
  viewMode: boolean = true;
  myTeams: Team[] = [];

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private myProfileService: MyProfileService
  ) {}

  async ngOnInit() {
    this.userId = JSON.parse(this.json).id;

    await this.userService.getAllUsers().subscribe({
      next: (us) => (this.users = us),
      error: (err) => console.log(err),
    });

    this.user = this.users.find((u) => u.id == this.userId);

    this.editForm = this.formBuilder.group({
      name: [this.user.name],
      phoneNo: [this.user.phoneNo],
      designation: [this.user.designation],
      address: [this.user.address],
    });

    this.myTeams = await this.myProfileService.getMyActiveTeamsAsync();
  }

  onClick() {
    this.viewMode = !this.viewMode;
  }

  onEdit() {
    this.user.name = this.editForm.value.name;
    this.user.designation = this.editForm.value.designation;
    this.user.phoneNo = this.editForm.value.phoneNo;
    this.user.address = this.editForm.value.address;

    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (u) =>
        this.toasterService.success('Profile Info Successfully Updated!'),
      error: (err) => this.toasterService.error('Error!'),
    });
  }
}
