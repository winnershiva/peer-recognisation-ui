import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { UserName } from '../profile/profile.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecognitionService } from './recognition.service';
import { Globals } from '../common/globals';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss']
})
export class RecognitionComponent implements OnInit {

  filteredUsers: Observable<UserName[]>;
  usernames: UserName[]; 
  disablePeople: boolean = false;
  disableBold: boolean = false;
  disableInclusive: boolean = false;
  disableInnovative: boolean = false;
  disableTrust: boolean = false;

  recognitionForm: FormGroup;

  user = new FormControl;
  badge: any;
  usershowError: boolean;
  userMessage: any;
  myStorageData = JSON.parse(localStorage.getItem('jwt') || '{}');
  myemployeeData = JSON.parse(localStorage.getItem('employeeData') || '{}');
  name: any;

  constructor(private router : Router, private fb : FormBuilder, private _snackBar: MatSnackBar, private recognitionService : RecognitionService,
    private globals : Globals, private profileService : ProfileService, private cdr: ChangeDetectorRef
  ) {    
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
}

get f() { return this.recognitionForm.controls; }

private getuser() {
  return this.user.valueChanges
  .pipe(
    startWith(''),
    map(emp => emp ? this._filterUsers(emp) : this.usernames)
  );
}

private _filterUsers(value: string): UserName[] {
  const filterValue = value.toLowerCase();

  return this.usernames.filter(emp => emp.employeeName.toLowerCase().indexOf(filterValue) === 0);
}

  ngOnInit(): void {

    this.globals.setLogin(true);

    this.name = this.myemployeeData.employeeName;

    this.getUsernames();
    this.getProfile();

    this.recognitionForm = this.fb.group({
      'username' : new FormControl('', Validators.required),
      'points' : new FormControl('', Validators.required),
      'comments' : new FormControl('', Validators.required),

    })

    this.recognitionForm.get('points')?.patchValue(100);
    this.recognitionForm.get('points')?.disable();
  }


  async logout() {
    this.router.navigate(["/login"]);
  }

  users : any[];

  getBadgeName(val:any) {

    this.badge = val;
    if(val == 'Bold') {
      this.disableBold = true;
      this.disableInclusive = false;
      this.disableInnovative = false;
      this.disablePeople = false;
      this.disableTrust = false;


    } else if(val == 'People-first') {

      this.disableBold = false;
      this.disableInclusive = false;
      this.disableInnovative = false;
      this.disablePeople = true;
      this.disableTrust = false;

    } else if(val == 'Inclusive') {

      this.disableBold = false;
      this.disableInclusive = true;
      this.disableInnovative = false;
      this.disablePeople = false;
      this.disableTrust = false;

    } else if(val == 'Innovative') {

      this.disableBold = false;
      this.disableInclusive = false;
      this.disableInnovative = true;
      this.disablePeople = false;
      this.disableTrust = false;

    }else if(val == 'Trust') {

      this.disableBold = false;
      this.disableInclusive = false;
      this.disableInnovative = false;
      this.disablePeople = false;
      this.disableTrust = true;

    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  getProfile() {

    debugger;
    let name: Number = this.myStorageData.employeeId;

    console.log("name", name);


    this.profileService.getProfileDetails(name).subscribe(res => {

      console.log("profile info",res, res.points);

      localStorage.setItem('employeeData', JSON.stringify(res));
      
      this.globals.setglobalPoints(res.points);

      this.router.navigateByUrl('/route');
      
    })
    // this.refreshApplication();
    // window.location.reload();
    
    this.globals.setglobalSpinner(false);
  }
        
  refreshApplication() {

  }


  async getUsernames() {

      this.recognitionService.getAllEmployeeDetails().subscribe(res => {
        this.usernames = res;
        this.usernames = this.usernames.filter(emp => emp.employeeId !== this.myemployeeData.employeeId)
        this.filteredUsers = this.getuser();
        console.log("res", res);
        
      });
  }

  async SubmitRecognition() {

    if (this.recognitionForm.invalid) {
      alert("please fill the form");
      return;
    }
    debugger;
    this.globals.setglobalSpinner(true);
    if(this.myemployeeData.points > 100) {

    let payload = {
      "badgeName" : this.badge,
      "comment" : this.recognitionForm.get('comments')?.value,
    }

    let giverId =  this.myStorageData.employeeId;
    let receiverId = this.recognitionForm.get('username')?.value;

    console.log('receiverId', receiverId);

    this.recognitionService.submitRecognition(payload, giverId, receiverId).subscribe(res => {

      if(res != null) {
        this.openSnackBar("Recognition Submitted Successfully.! 👏", "Ok");
      }

      this.globals.setglobalSpinner(false);


    })

    this.getProfile();

  } else {
    this.globals.setglobalSpinner(false);
    this.openSnackBar("Sorry you are not able to recognise as your cart value is less than 100", "Ok");
  }

    this.resetForm();
    
    
  }

    async resetForm() {
      this.disableInclusive = false;
      this.disableInnovative = false;
      this.disablePeople = false;
      this.disablePeople = false;
      this.disableTrust = false;
    this.recognitionForm.reset();
  }
}
