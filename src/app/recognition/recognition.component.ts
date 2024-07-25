import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
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

  return this.usernames.filter(emp => emp.name.toLowerCase().indexOf(filterValue) === 0);
}

  ngOnInit(): void {

    this.globals.setLogin(true);

    this.recognitionForm = this.fb.group({
      'username' : new FormControl(''),
      'points' : new FormControl(''),
      'comments' : new FormControl(''),

    })
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


    if (this.recognitionForm.get('username')?.value.length > 3) {

      this.recognitionService.searchPerson(this.recognitionForm.get('username')?.value).subscribe(res => {

        this.usernames = res;
         
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

        console.log("res", res);
        
      });
    }

    this.filteredUsers = this.getuser();
    this.globals.setglobalSpinner(false);


  }

  async SubmitRecognition() {

    this.openSnackBar("Recognition Submitted Successfully.! 👏", "Ok")
  }

  async resetForm() {
    this.recognitionForm.reset();
  }
}
