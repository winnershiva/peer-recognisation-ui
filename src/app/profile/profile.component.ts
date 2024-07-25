import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Globals } from '../common/globals';
import { ProfileService } from './profile.service';


export interface UserName {
 

  employeeId: number,
        employeeName: string,
        designation: string,
        email: string,
        earned: number,
        points: number
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: any;

  constructor(private globals: Globals, private profileService: ProfileService, private route : Router) {}

  myRewards: { employeeId: number; employeeName: string; email: string; badgesReceived: { giverName: number; receiver: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[]; };
  inclusiveBadge: { giverName: number; receiver: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];
  boldBadge: { giverName: number; receiver: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];
  trustBadge: { giverName: number; receiver: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];
  innovativeBadge: { giverName: number; receiver: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];
  peoplefirstBadge: { giverName: number; receiver: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];

  ngOnInit(): void {

    this.getProfile();

    this.globals.setLogin(true);

    this.myRewards = {
      "employeeId": 2,
      "employeeName": "Anusha Korra",
      "email": "anushakorra@gmail.com",
      "badgesReceived": [
          {
              "giverName": 3,
              "receiver": 2,
              "badgeName": null,
              "comment": "Your unwavering commitment to fostering a welcoming and supportive environment for everyone is truly commendable",
              "badges": {
                  "badgeId": 2,
                  "badgeName": "Inclusive"
              }
          },
          {
              "giverName": 1,
              "receiver": 2,
              "badgeName": null,
              "comment": "Your unwavering commitment to fostering a welcoming and supportive environment for everyone is truly commendable",
              "badges": {
                  "badgeId": 3,
                  "badgeName": "Bold"
              }
          },
          {
              "giverName": 5,
              "receiver": 2,
              "badgeName": null,
              "comment": "Your unwavering commitment to fostering a welcoming and supportive environment for everyone is truly commendable",
              "badges": {
                  "badgeId": 2,
                  "badgeName": "Inclusive"
              }
          }
      ]
  }

  this.getMyBadges();
  

  }

 
  getMyBadges() {

    // this.profileService.getEarnedBadges(this.name).subscribe(res => {


    //   console.log("badgesres", res)

    // })

    var badgeObj = [{}];
    
    let obj = {badge : "", data : {}};
     this.inclusiveBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'Inclusive');
     this.boldBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'Bold');
     this.trustBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'Trust');
     this.innovativeBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'Innovative');
     this.peoplefirstBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'PeopleFirst');
    
     console.log("boldBadge", this.boldBadge);
     
    this.globals.setglobalSpinner(false);
     
  }

  getProfile() {
    let name;
    this.profileService.getProfileDetails(name).subscribe(res => {

      console.log("profile info",res);
      
    this.globals.setglobalSpinner(false);
    })

    this.globals.setglobalSpinner(false);
  }

  gotoRedeem() {

    this.route.navigate(['/redeem']);
  }
   


}
