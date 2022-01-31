import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { User } from '../user';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    private formBuilder: FormBuilder
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
    this.http.get<any>('http://localhost:3000/singupUsers').subscribe({
      next: (data) => {
        this.rows = data;
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
        this.editForm.get('team').patchValue(this.selectedUser.team);
      },
      error: (err) => alert('Error!'),
    });

    this.modalRef = this.modalService.show(template);
    this.modalRef.id = value;
  }

  edit(value) {}

  delete(value) {}
}
