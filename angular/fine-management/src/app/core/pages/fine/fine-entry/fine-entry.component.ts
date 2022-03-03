import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { Team } from 'src/app/core/models/team';
import { UserTeam } from 'src/app/core/models/user-team';
import { MyProfileService } from 'src/app/core/services/my-profile.service';
import { TeamService } from 'src/app/core/services/team.service';
import { UserTeamService } from 'src/app/core/services/user-team.service';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FineTypes } from '../../../enums/fine-types';
import { FineService } from 'src/app/core/services/fine.service';
import { ToastrService } from 'ngx-toastr';
import { Fine } from 'src/app/core/models/fine';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-fine-entry',
  templateUrl: './fine-entry.component.html',
  styleUrls: ['./fine-entry.component.scss'],
})
export class FineEntryComponent implements OnInit {
  users: User[];
  teams: Team[];
  userTeams: UserTeam[];
  myTeams: Team[];
  fineEntryForm: FormGroup;
  usersOfmySelectedTeam: User[];
  fineTypes = FineTypes;
  keys = Object.keys;

  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private userTeamService: UserTeamService,
    private toastrService: ToastrService,
    private myProfileService: MyProfileService,
    private formBuilder: FormBuilder,
    private fineService: FineService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fineEntryForm = this.formBuilder.group({
      teamId: [''],
      userId: [''],
      fineType: [''],
      fineAmount: [''],
      date: [''],
      note: ['']
    });

    this.userService.getAllUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => console.log(err),
    });

    this.teamService.getAllTeams().subscribe({
      next: (teams) => (this.teams = teams),
      error: (err) => console.log(err),
    });

    this.userTeamService.getAllUserTeams().subscribe({
      next: (userTeams) => (this.userTeams = userTeams),
      error: (err) => console.log(err),
    });

    this.myProfileService.getMyActiveTeamsAsync().then((ts) => this.myTeams = ts);
  }

  onSelect() {
    const selectedTeamId = this.fineEntryForm.value.teamId;

    const filteredUserTeams = this.userTeams.filter(
      (ut) => ut.teamId == selectedTeamId
    );

    this.usersOfmySelectedTeam = filteredUserTeams.map(
      (ut) => this.users.filter((u) => u.id == ut.userId)[0]
    );
  }

  onSubmit() {
    const userTeam = this.userTeams.filter(
      (ut) =>
        this.fineEntryForm.value.teamId == ut.teamId &&
        this.fineEntryForm.value.userId == ut.userId
    )[0];

    const formValue = this.fineEntryForm.value;

    let fine: Fine = <Fine>{
      userTeamId: userTeam.id,
      fineType: formValue.fineType,
      fineAmount: formValue.fineAmount,
      date: <Date>formValue.date,
      note: formValue.note,
    };

    this.fineService.addFine(fine).subscribe({
      next: () => this.toastrService.success('Successfully add fine!'),
      error: (err) => this.toastrService.error('Error! Can not add fine!'),
      complete: () => this.router.navigate(['/main/fineList']),
    });
  }
}
