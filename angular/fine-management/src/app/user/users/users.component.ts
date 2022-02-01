import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { User } from '../user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MyProfileService } from 'src/app/services/my-profile.service';
import { UserTeamService } from 'src/app/services/user-team.service';
import { UserTeam } from 'src/app/models/user-team';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  modalRef: BsModalRef;
  selectedUser: User;
  editForm: FormGroup;

  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private myProfileService: MyProfileService,
    private userTeamService: UserTeamService
  ) {}

  rows = [];
  columns = [
    { prop: 'name' },
    { prop: 'email' },
    { prop: 'phoneNo' },
    { prop: 'team' },
    { prop: 'id' },
  ];

  ngOnInit(): void {
    this.userTeamService
      .getUserTeamByTeamId(this.myProfileService.getMyLastTeamId())
      .subscribe({
        next: (userTeam: UserTeam[]) => {
          userTeam.forEach((element) => {
            this.userService.getUserById(element.userId).subscribe({
              next: (user: User) => this.rows.push(user),
              error: (err) => console.log(err)
            });
          });
        },
        error: (err) => alert(err),
      });
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phoneNo: [''],
      team: [''],
    });
  }

  openEditModal(template: TemplateRef<any>, value) {
    this.userService.getUserById(value).subscribe({
      next: (res: User) => {
        this.selectedUser = res;
        this.editForm.get('name').patchValue(this.selectedUser.name);
        this.editForm.get('email').patchValue(this.selectedUser.email);
        this.editForm.get('phoneNo').patchValue(this.selectedUser.phoneNo);
        this.editForm.get('team').patchValue(this.selectedUser.teamId);
      },
      error: (err) => console.log('Error!'),
    });

    this.modalRef = this.modalService.show(template);
    this.modalRef.id = value;
  }

  edit(value) {}

  delete(value) {}
}
