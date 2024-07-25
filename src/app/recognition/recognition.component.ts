import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { UserName } from '../profile/profile.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecognitionService } from './recognition.service';
import { Globals } from '../common/globals';

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss']
})
export class RecognitionComponent implements OnInit {

  filteredUsers: Observable<UserName[]>;
  usernames: UserName[]; 

  recognitionForm: FormGroup;

  user = new FormControl;
  badge: any;
  usershowError: boolean;
  userMessage: any;
  myStorageData = JSON.parse(localStorage.getItem('jwt') || '{}');

  constructor(private router : Router, private fb : FormBuilder, private _snackBar: MatSnackBar, private recognitionService : RecognitionService,
    private globals : Globals
  ) { 

   
   
}

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

    // this.getUsernames();

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

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  async getUsernames() {

    if (this.recognitionForm.get('username')?.value.length > 0) {

      this.recognitionService.searchPerson(this.recognitionForm.get('username')?.value).subscribe(res => {

        if(res != "" && res.message ) {
          this.usernames = res;
          this.usershowError = false;
          this.userMessage = "";
        } else if(res.success == false){
          this.usershowError = true;
          this.userMessage = res.message;
        }

        
         
        // this.usernames = [
        //   {
        //     name: 'Anusha Korra',
        //     empId: '123456',
        //     emailId: 'anusha.k@gmail.com'
        //   },
        //   {
        //     name: 'Bharathwaj',
        //     empId: '786543',
        //     emailId: 'bharathwaj.b@gmail.com'
        //   },
        //   {
        //     name: 'Shiva Prasad',
        //     empId: '982345',
        //     emailId: 'shiva.m@gmail.com'
        //   },
        //   {
        //     name: 'Vinay',
        //     empId: '4567675',
        //     emailId: 'vinay.g@gmail.com'
        //   },
        //   {
        //     name: 'Satya Paluri',
        //     empId: '140837',
        //     emailId: 'satya.p@gmail.com'
        //   }
        // ];
        this.filteredUsers = this.getuser();
        console.log("res", res);
        
      });
    }

    // this.filteredUsers = this.getuser();
    this.globals.setglobalSpinner(false);


  }

  async SubmitRecognition() {

    let payload = {
      "badgeName" : this.badge,
      "comment" : this.recognitionForm.get('comments')?.value,
    }

    let giverId =  this.myStorageData.employeeId;
    let receiverId = 101;

    this.recognitionService.submitRecognition(payload, giverId, receiverId).subscribe(res => {

      if(res != null) {
        this.openSnackBar("Recognition Submitted Successfully.! 👏", "Ok");
      }

    })

    
  }

    async resetForm() {
    this.recognitionForm.reset();
  }
}
