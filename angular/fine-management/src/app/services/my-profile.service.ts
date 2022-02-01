import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { UserTeamService } from './user-team.service';

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  constructor(private userTeamService: UserTeamService) { }

  getProfile() : User
  {
    return JSON.parse(localStorage.getItem('user'));
  }

  getMyLastTeamId() 
  {
     this.userTeamService.getUserTeamByUserId(this.getProfile().id).subscribe({
      next: (res) => 
        {return res[res.length-1]}
     })
  } 
}
