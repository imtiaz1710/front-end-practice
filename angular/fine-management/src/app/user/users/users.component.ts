import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MyProfileService } from 'src/app/services/my-profile.service';
import { UserTeamService } from 'src/app/services/user-team.service';
import { Team } from 'src/app/models/team';
import { UserTeam } from 'src/app/models/user-team';
import { TeamService } from 'src/app/services/team.service';
import { User } from '../user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  modalRef: BsModalRef;
  myTeams: Team[] = [];
  addToTeamForm: FormGroup = new FormGroup({
    userId: new FormControl(''),
    teamId: new FormControl('')
  });
  teams: Team[] = [];
  users: User[] = [];
  userTeams: UserTeam[] = [];
  rows = [];

  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private myProfileService: MyProfileService,
    private userTeamService: UserTeamService,
    private teamService: TeamService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.addToTeamForm = this.formBuilder.group({
      userId: ['', Validators.required],
      teamId: ['', Validators.required],
    });

    this.loadAllDataForDataTable();
  }

  loadAllDataForDataTable() {
    this.rows = [];
    let usersPromise = this.userService.getAllUsersPromise();
    let teamsPromise = this.teamService.getAllTeamsPromise();
    let userTeamPromise = this.userTeamService.getAllUserTeamsPromise();
    let myTeamsPromise = this.myProfileService.getMyTeamsPromise();

    Promise.all([
      usersPromise,
      teamsPromise,
      userTeamPromise,
      myTeamsPromise,
    ]).then((results) => {
      this.users = results[0];
      this.teams = results[1];
      this.userTeams = results[2];
      this.myTeams = results[3];

      this.myTeams.forEach((myTeam) => {
        let myUserTeamMates = this.userTeams.filter(
          (ut) => ut.teamId == myTeam.id && ut.isActive
        );
        myUserTeamMates.forEach((userTeamMate) => {
          let user = this.users.filter((u) => u.id == userTeamMate.userId)[0];
          let team = this.teams.filter((t) => t.id == userTeamMate.teamId)[0];

          let userTeam = {
            ...user,
            teamName: team.name,
            userTeamId: userTeamMate.id,
          };
          this.rows.push(userTeam);
        });
      });

      this.rows = this.rows.map(
        (row) =>
        (row = {
          name: row.name,
          email: row.email,
          phoneNo: row.phoneNo,
          teamName: row.teamName,
          userTeamId: row.userTeamId,
        })
      );
    });
  }

  onAdd() {
    let filteredUserTeam = this.userTeams.find(
      (ut) =>
        ut.teamId == this.addToTeamForm.value.teamId &&
        ut.userId == this.addToTeamForm.value.userId
    );

    if (filteredUserTeam) {
      if (filteredUserTeam.isActive)
        this.toastrService.error('User already exists in the selected team');
      else {
        this.changeStatusOfUserTeam(filteredUserTeam, true);
      }
    } else {
      let userTeam: UserTeam = {
        ...this.addToTeamForm.value,
        isActive: true
      };

      this.userTeamService.addUserTeam(userTeam).subscribe({
        next: (res) => {
          this.toastrService.success('Member successfully added to a team!');
          this.addToTeamForm.reset();
          this.loadAllDataForDataTable();
        },
        error: (err) => this.toastrService.error('Failed to add user!'),
      });
    }
  }

  openAddUserModal(template: TemplateRef<any>) {
    debugger
    if (this.addToTeamForm.valid)
      this.modalRef = this.modalService.show(template);
    else this.toastrService.error('invalid operation!');
  }

  openDeleteUserModal(template: TemplateRef<any>, userTeamId: number) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.content = userTeamId;
  }

  onDelete(value) {
    debugger
    let userTeam = this.userTeams.filter((ut) => ut.id == value)[0];
    this.changeStatusOfUserTeam(userTeam, false);
  }

  changeStatusOfUserTeam(userTeam: UserTeam, status: boolean) {
    userTeam.isActive = status;

    this.userTeamService.updateUserTeam(userTeam).subscribe({
      next: (res) => {
        this.toastrService.success('Done!');
        this.addToTeamForm.reset();
        this.loadAllDataForDataTable();
      },
      error: (err) => this.toastrService.error('Operation Failed!')
    });
  }
}
