import { Injectable } from '@angular/core';
import { Subject ,BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

export interface successObj {
    id:number,
    message:string
}
@Injectable()
export class Globals {
    
    public blockSpinner = new BehaviorSubject<boolean>(true);
    public globalSpinner = new ReplaySubject<any>();

    public getLoggedIn = new BehaviorSubject<boolean>(false);
    public globalLogin = new ReplaySubject<any>();

    
    
    blockFlagForSpinner(flag:any) { this.blockSpinner.next(flag); }
    getGlobalLogin(flag:any){this.getLoggedIn.next(flag);}

    setglobalSpinner(value:boolean){this.globalSpinner.next(value);}
    setLogin(value:boolean) {
        this.globalLogin.next(value);
    }
  
     constructor(
        private router: Router
    ) { }

}