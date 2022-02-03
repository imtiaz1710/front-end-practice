import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MyProfileService } from 'src/app/services/my-profile.service';
import { UserTeamService } from 'src/app/services/user-team.service';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  modalRef: BsModalRef;
  myTeams = [];
  selectTeamForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private myProfileService: MyProfileService,
    private userTeamService: UserTeamService
  ) {}

  rows = [];;

  ngOnInit(): void {
    this.myProfileService.getMyTeamsPromise().then((teams) => {
      this.myTeams = teams;
      this.LoadUsersByTeams(this.myTeams);
    });

    this.selectTeamForm = this.formBuilder.group({
      teamId: [''],
    });
  }

  onSelect() {}

  LoadUsersByTeams(teams: Team[]) {
    teams.forEach((team) => {
      let promise1, promises = [];
      promise1 = this.getUserTeamByTeamIdPromise(team.id);

      promise1.then((userTeams) => {
        userTeams.forEach((userTeam) => {
          promises.push(this.getUserByUserTeam(userTeam.userId));
        });

        Promise.all(promises).then((user) => {
          this.rows.push(...user);

          this.rows = this.rows.map(
            (x) =>
              (x = {
                name: x.name,
                email: x.email,
                phoneNo: x.phoneNo,
                team: x.team,
                id: x.id,
              })
          );
        });
      });
    });
  }

  getUserByUserTeam(userId: number) {
    return new Promise((resolve, reject) => {
      this.userService.getUserById(userId).subscribe({
        next: (result) => {
          resolve(result);
        },
        error: (err) => reject(err),
      });
    });
  }

  getUserTeamByTeamIdPromise(teamId: number) {
    return new Promise((resolve, reject) => {
      this.userTeamService.getUserTeamByTeamId(teamId).subscribe({
        next: (result) => {
          resolve(result);
        },
        error: (err) => reject(err),
      });
    });
  }

  delete(value) {}
}
