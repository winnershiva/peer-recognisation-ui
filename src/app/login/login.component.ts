import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Globals } from '../common/globals';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private loginService : LoginService, private globals : Globals) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
        'username': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
      })
  }

  get f() { return this.loginForm.controls; }

  async login() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    let payload = {
          "email" : this.loginForm.get('username')?.value,
          "password" : this.loginForm.get('password')?.value
    }

    console.log("payload", payload);
    this.loginService.loginIntoRecognition(payload).subscribe(data => {

      console.log("login", data);

      localStorage.setItem('jwt',JSON.stringify(data));

      this.globals.setLogin(true);
      this.router.navigate(['/recognition']);
    })

    
  }

}
function typeOf(data: any): any {
  throw new Error('Function not implemented.');
}

