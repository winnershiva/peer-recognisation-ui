import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Globals } from '../common/globals';
import { ProfileService } from './profile.service';


export interface UserName {
  name: string;
  empId: string;
  emailId: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: any;

  constructor(private globals: Globals, private profileService: ProfileService) {}

  myRewards: { employeeId: number; employeeName: string; email: string; badgesReceived: { giverId: number; receiverId: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[]; };
  inclusiveBadge: { giverId: number; receiverId: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];
  boldBadge: { giverId: number; receiverId: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];
  trustBadge: { giverId: number; receiverId: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];
  sustainableBadge: { giverId: number; receiverId: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];
  peoplefirstBadge: { giverId: number; receiverId: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];

  ngOnInit(): void {

    this.globals.setLogin(true);

    this.myRewards = {
      "employeeId": 2,
      "employeeName": "Anusha Korra",
      "email": "anushakorra@gmail.com",
      "badgesReceived": [
          {
              "giverId": 3,
              "receiverId": 2,
              "badgeName": null,
              "comment": "Your unwavering commitment to fostering a welcoming and supportive environment for everyone is truly commendable",
              "badges": {
                  "badgeId": 2,
                  "badgeName": "Inclusive"
              }
          },
          {
              "giverId": 1,
              "receiverId": 2,
              "badgeName": null,
              "comment": "Your unwavering commitment to fostering a welcoming and supportive environment for everyone is truly commendable",
              "badges": {
                  "badgeId": 3,
                  "badgeName": "Bold"
              }
          },
          {
              "giverId": 5,
              "receiverId": 2,
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

    this.profileService.getEarnedBadges(this.name).subscribe(res => {


      console.log("badgesres", res)

    })

    var badgeObj = [{}];
    
    let obj = {badge : "", data : {}};
     this.inclusiveBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'Inclusive');
     this.boldBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'Bold');
     this.trustBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'Trust');
     this.sustainableBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'Sustainable');
     this.peoplefirstBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'PeopleFirst');
    
     console.log("boldBadge", this.boldBadge);
     
  }
   


}
