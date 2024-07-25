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

  constructor(private router: Router, private globals: Globals, private changeDetRef: ChangeDetectorRef) {

  }
  ngOnInit(): void {

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
  }

  logout() {
    this.globals.setLogin(false);
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
  gotoLanding() {
    this.router.navigate(['/recognition']);
  }
}



