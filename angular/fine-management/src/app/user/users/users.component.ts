import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { User } from '../user';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MyProfileService } from 'src/app/services/my-profile.service';
import { UserTeamService } from 'src/app/services/user-team.service';
import { UserTeam } from 'src/app/models/user-team';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  modalRef: BsModalRef;
  myTeams: Team[];
  selectTeamForm : FormGroup;

  constructor(
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
    let teamsObservable = this.myProfileService.getMyTeams();
    
    teamsObservable.forEach((teamObs) => {
      teamObs.subscribe({
        next: (team) => {
          this.myTeams.push(team);
        },
        error: (err) => console.log(err)
      })
    });

    this.selectTeamForm = this.formBuilder.group(
      {
        teamId: ['']
      }
    )
  }

  onSelect()
  {
    this.userTeamService.getUserTeamByTeamId(1).subscribe({
      next: (userTeam: UserTeam[]) => {
        userTeam.forEach((element) => {
          this.userService.getUserById(element.userId).subscribe({
            next: (user: User) => this.rows.push(user),
            error: (err) => console.log(err),
          });
        });
      },
      error: (err) => console.log(err),
    });
  }

  delete(value) {}
}
