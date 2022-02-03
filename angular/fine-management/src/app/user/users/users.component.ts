import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
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
  myTeams: Team[] = [];
  selectTeamForm: FormGroup;

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
    { prop: 'id' },
  ];

  ngOnInit(): void {
    // let teamsObservable: Observable<Team>[] = this.myProfileService.getMyTeams();
    // console.log(teamsObservable)

    // teamsObservable.forEach((teamObs) => {
    //   teamObs.subscribe({
    //     next: (team) => {
    //       console.log(team)
    //       this.myTeams.push(team);
    //     },
    //     error: (err) => console.log(err),
    //   });
    // });
    this.myTeams = this.myProfileService.getMyTeams();

    this.selectTeamForm = this.formBuilder.group({
      teamId: [''],
    });
  }

  onSelect() {
    let promise1, promises = [];
    promise1 = this.getUserTeamByTeamId(this.selectTeamForm.value.teamId);

    promise1.then((res) => {
      res.forEach((element) => {
        promises.push(this.getUserById(element.userId));
      });

      Promise.all(promises)
        .then((user) => {
          this.rows = user;
          this.rows = this.rows.map(
            (x) =>
              (x = {
                name: x.name,
                email: x.email,
                phoneNo: x.phoneNo,
                id: x.id,
              })
          );
        })
    });

    // promise1.then((userTeams: UserTeam[]) => {
    //   debugger
    //   userTeams.map((userTeam) => {
    //     promises.push(this.getUserById(userTeam.userId));
    //     // Promise.all([promise1, promise2]).then(() => {
    //     //   promise2.then((row) => {
    //     //     let data = {};
    //     //     data['id'] = row.id;
    //     //     data['name'] = row.name;
    //     //     data['email'] = row.email;
    //     //     data['phoneNo'] = row.phoneNo;
    //     //     this.rows.push(data);
    //     //   });
    //     // });
    //   });
    // });

    // Promise.all([promise1,...promises]).then((res) => {

    //   res.map((p) => {
    //     this.rows.push(p);
    //   });
    //   debugger
    //   this.rows = this.rows.map(
    //     (x) =>
    //       (x = {
    //         name: x.name,
    //         email: x.email,
    //         phoneNo: x.phoneNo,
    //         id: x.id,
    //       })
    //   );
    // });

    // let userPromises = [];
    // userPromises.push(
    //   this.getUserTeamByTeamId(this.selectTeamForm.value.teamId).then(
    //     (userTeams: UserTeam[]) => {
    //       userTeams.forEach((element) => {
    //         userPromises.push(this.getUserById(element.userId));
    //       });
    //     }
    //   )
    // );

    // Promise.all(userPromises).then((result) => {
    //   debugger;
    //   //this.rows.push();
    // });
    // this.rows = [];
    //   this.userTeamService
    //     .getUserTeamByTeamId(<number>this.selectTeamForm.value.teamId)
    //     .subscribe({
    //       next: (userTeam: UserTeam[]) => {
    //         userTeam.forEach((element) => {
    //           this.userService.getUserById(element.userId).subscribe({
    //             next: (user: User) => {
    //               this.rows.push(user);
    //             },
    //             error: (err) => console.log(err),
    //           });
    //         });
    //       },
    //       error: (err) => console.log(err),
    //     });
    // this.rows = this.rows.map(
    //   (x) =>
    //     (x = {
    //       name: x.name,
    //       email: x.email,
    //       phoneNo: x.phoneNo,
    //       id: x.id,
    //     })
    // );
  }

  getUserById(userId: number) {
    return new Promise((resolve, reject) => {
      this.userService.getUserById(userId).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  getUserTeamByTeamId(teamId: number) {
    return new Promise((resolve, reject) => {
      this.userTeamService.getUserTeamByTeamId(teamId).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  delete(value) {}
}
