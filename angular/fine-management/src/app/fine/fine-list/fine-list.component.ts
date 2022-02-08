import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Fine } from 'src/app/models/fine';
import { Team } from 'src/app/models/team';
import { UserTeam } from 'src/app/models/user-team';
import { FineService } from 'src/app/services/fine.service';
import { MyProfileService } from 'src/app/services/my-profile.service';
import { TeamService } from 'src/app/services/team.service';
import { UserTeamService } from 'src/app/services/user-team.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user/user';
import {FineTypes} from '../../enums/fine-types';

@Component({
  selector: 'app-fine-list',
  templateUrl: './fine-list.component.html',
  styleUrls: ['./fine-list.component.scss'],
})
export class FineListComponent implements OnInit {
  modalRef: BsModalRef;
  users: User[];
  teams: Team[];
  userTeams: UserTeam[];
  myTeams: Team[];
  fines: Fine[];
  filteredFineList: Fine[];
  rows = [];
  editFineForm: FormGroup;
  fineTypes: FineTypes;
  keys = Object.keys;

  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private userTeamService: UserTeamService,
    private toastrService: ToastrService,
    private myProfileService: MyProfileService,
    private fineService: FineService,
    private modalService: BsModalService
  ) { }

  async ngOnInit() {
    this.filteredFineList = [];
    await this.fineService.getAllFines().subscribe({
      next: (fines) => (this.fines = fines),
      error: (err) => console.log(err),
    });

    await this.userService.getAllUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => console.log(err),
    });

    await this.teamService.getAllTeams().subscribe({
      next: (teams) => (this.teams = teams),
      error: (err) => console.log(err),
    });

    await this.userTeamService.getAllUserTeams().subscribe({
      next: (userTeams) => (this.userTeams = userTeams),
      error: (err) => console.log(err),
    });

    await this.myProfileService
      .getMyTeamsPromise()
      .then((teams) => (this.myTeams = teams))
      .catch((err) => console.log(err));

    this.loadFineList();
    this.rows = this.formateFineList();
  }

  private formateFineList() {
    return this.filteredFineList.map((fl) => {
      let userTeam = this.userTeams.filter((ut) => ut.id == fl.userTeamId)[0];
      let user = this.users.filter((u) => u.id == userTeam.userId)[0];
      let team = this.teams.filter((t) => t.id == userTeam.teamId)[0];
      return {
        name: user.name,
        teamName: team.name,
        fineType: fl.fineType,
        fineAmount: fl.fineAmount,
        date: fl.date,
        note: fl.note,
        id: fl.id,
      };
    });
  }

  private loadFineList() {
    this.myTeams.forEach((myTeam) => {
      let userTeams = this.userTeams.filter((ut) => myTeam.id == ut.teamId);

      userTeams.forEach((ut) => {
        let fines = this.fines.filter((f) => f.userTeamId == ut.id);
        this.filteredFineList.push(...fines);
      });
    });
  }

  edit() {
    this.fineService.updateFine(this.editFineForm.value);
  }

  Delete(value) { 
    
  }

  openEditFineModal(template: TemplateRef<any>, fineId: number) {
    let fine = this.fines.filter(f => f.id == fineId)[0];
    let userTeam = this.userTeams.filter(ut => ut.id == fine.userTeamId)[0];
    let user = this.users.filter(u => u.id == userTeam.userId)[0];
    let team = this.teams.filter(t => t.id == userTeam.teamId)[0];
    debugger
    this.editFineForm = new FormBuilder().group({
      name: [{ value: user.name, disabled: false}],
      teamName:[{ value: team.name, disabled: false }],
      fineType:[{value: fine.fineType, disabled: false}],
      fineAmount:[{ value: fine.fineAmount, disabled: false }],
      date:[{ value: fine.date, disabled: false }],
      fineId:['']
    })
    debugger
    this.modalRef = this.modalService.show(template);
  }
}
