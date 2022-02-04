import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MyProfileService } from 'src/app/services/my-profile.service';
import { UserTeamService } from 'src/app/services/user-team.service';
import { Team } from 'src/app/models/team';
import { UserTeam } from 'src/app/models/user-team';
import { TeamService } from 'src/app/services/team.service';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  modalRef: BsModalRef;
  myTeams: Team[] = [];
  addToTeamForm: FormGroup;
  teams: Team[] = [];
  users: User[] = [];
  userTeams: UserTeam[] = [];

  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private myProfileService: MyProfileService,
    private userTeamService: UserTeamService,
    private teamService: TeamService
  ) {}

  rows = [];

  ngOnInit(): void {
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

          let userTeam = { ...user, teamName: team.name };
          this.rows.push(userTeam);
        });
      });

      this.rows = this.rows.map(
        (r) =>
          (r = {
            name: r.name,
            email: r.email,
            phoneNo: r.phoneNo,
            teamName: r.teamName,
            id: r.id,
          })
      );
    });

    this.addToTeamForm = this.formBuilder.group({
      userId: [''],
      teamId: ['']
    });
  }

  onAdd() {
    
  }

  openAddUserModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  delete(value) {}
}
