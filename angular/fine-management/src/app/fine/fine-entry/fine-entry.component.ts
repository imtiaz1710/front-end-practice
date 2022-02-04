import { Component, OnInit } from '@angular/core';
import{ Route } from '@angular/router'
import { TeamService } from 'src/app/services/team.service';
import { UserTeamService } from 'src/app/services/user-team.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-fine-entry',
  templateUrl: './fine-entry.component.html',
  styleUrls: ['./fine-entry.component.scss']
})
export class FineEntryComponent implements OnInit {
  users: User[];
  constructor(private teamService: TeamService, private userService: UserService, private userTeamService: UserTeamService) { }

  async ngOnInit() {
    await (await this.userService.getAllUsers()).subscribe((users) => users = this.users);
    
  }

}
