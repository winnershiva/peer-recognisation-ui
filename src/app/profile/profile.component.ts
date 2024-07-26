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

  myStorageData = JSON.parse(localStorage.getItem('jwt') || '{}');
  myemployeeData = JSON.parse(localStorage.getItem('employeeData') || '{}');
  earnedRewards: any;
  innovativeflag: boolean;
  boldBadgeflag: boolean;
  trustflag: boolean;
  inclusiveflag: boolean;
  peopleflag: boolean;

  constructor(private globals: Globals, private profileService: ProfileService, private route : Router) {}

  myRewards: { employeeId: number; employeeName: string; email: string; badgesReceived: { giverName: number; receiver: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[]; };
  inclusiveBadge: { giverName: number; receiver: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];
  boldBadge: { giverName: number; receiver: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];
  trustBadge: { giverName: number; receiver: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];
  innovativeBadge: { giverName: number; receiver: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];
  peoplefirstBadge: { giverName: number; receiver: number; badgeName: null; comment: string; badges: { badgeId: number; badgeName: string; }; }[];

  ngOnInit(): void {

    this.getProfile();

    this.earnedRewards = this.myemployeeData.earned;

    this.globals.setLogin(true);

  this.getMyBadges();
  

  }

 
  getMyBadges() {

    let name: Number = this.myStorageData.employeeId;

    this.profileService.getEarnedBadges(name).subscribe(res => {

      this.myRewards = res;

      console.log("badgesres", res);

      var badgeObj = [{}];
    
    let obj = {badge : "", data : {}};
     this.inclusiveBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'Inclusive');
     this.boldBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'Bold');
     this.trustBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'Trust');
     this.innovativeBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'Innovative');
     this.peoplefirstBadge = this.myRewards.badgesReceived.filter(d => d.badges.badgeName === 'PeopleFirst');
    
     if(this.innovativeBadge.length > 0) {
      this.innovativeflag = true;
     } else {
      this.innovativeflag = false;
     }
     if(this.boldBadge.length > 0) {
      this.boldBadgeflag = true;
     } else {
      this.boldBadgeflag = false;
     }
     if(this.trustBadge.length > 0) {
      this.trustflag = true;
     } else {
      this.trustflag = false;
     }
     if(this.inclusiveBadge.length > 0) {
      this.inclusiveflag = true;
     } else {
      this.inclusiveflag = false;
     }
     if(this.peoplefirstBadge.length > 0) {
      this.peopleflag = true;
     } else {
      this.peopleflag = false;
     }

     console.log("boldBadge", this.boldBadge);

    })


     
    this.globals.setglobalSpinner(false);
     
  }

  getProfile() {
    let name = this.myStorageData.employeeId;
    console.log("name", name);
    
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
