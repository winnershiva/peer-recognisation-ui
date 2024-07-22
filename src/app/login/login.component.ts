import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  username : any;
  password : any;

  form: FormGroup = new FormGroup(
     {

    }
  );

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  async submit() {
    alert("Logged in..");
    this.router.navigate(['/profile']);
  }

}
