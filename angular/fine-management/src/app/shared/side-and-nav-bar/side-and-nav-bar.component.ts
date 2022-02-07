import { Component, OnInit } from '@angular/core';
import { MyProfileService } from 'src/app/services/my-profile.service';
import { User } from 'src/app/user/user';
import { AccessChecker } from '../access-checker';


@Component({
  selector: 'app-side-and-nav-bar',
  templateUrl: './side-and-nav-bar.component.html',
  styleUrls: ['./side-and-nav-bar.component.scss'],
})
export class SideAndNavBarComponent implements OnInit {
  myProfile: User;

  constructor(private accessChecker : AccessChecker, private myProfileService: MyProfileService) {}

  ngOnInit(): void {
    this.myProfile = this.myProfileService.getProfile();
    
    this.accessChecker.preventUnauthorizedAccess();
  }

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
}
