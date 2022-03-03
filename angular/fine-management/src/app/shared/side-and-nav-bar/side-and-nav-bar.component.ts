import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { MyProfileService } from 'src/app/core/services/my-profile.service';
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
