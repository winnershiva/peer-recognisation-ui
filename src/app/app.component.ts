import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from './common/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'star-employee';

  public spinnerLoader: boolean = false;

  public loggedinValue: boolean = false;
  updatedPoints = 1000;

  myemployeeData = JSON.parse(localStorage.getItem('employeeData') || '{}');
  employeeName: any;

  constructor(private router: Router, private globals: Globals, private changeDetRef: ChangeDetectorRef) {

  }
  ngOnInit(): void {

    this.employeeName = this.myemployeeData.employeeName;

    this.globals.blockSpinner.subscribe(flag => {

      this.globals.globalSpinner.subscribe(spinnerValue => {
        this.spinnerLoader = spinnerValue;
        this.changeDetRef.detectChanges();
      });

    });

    this.globals.getLoggedIn.subscribe(flag => {

      this.globals.globalLogin.subscribe(loginValue => {
         this.loggedinValue = loginValue;
         this.changeDetRef.detectChanges();
        
      })

    })

    this.globals.getPoints.subscribe(Number => {

      this.globals.globalPoints.subscribe(data => {
         this.updatedPoints = data;
         this.changeDetRef.detectChanges();
        
      })

    })
  }

  logout() {
    this.globals.setLogin(true);
    this.loggedinValue = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
  gotoDashboard() {
    this.router.navigate(['/recognition']);
  }
}



