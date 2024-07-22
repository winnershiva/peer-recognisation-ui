import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  recognitionForm: FormGroup = new FormGroup(
    {username : new FormControl}
  );

  constructor(private router : Router, private fb : FormBuilder) { }

  ngOnInit(): void {
  }

  async logout() {
    this.router.navigate(["/login"]);
  }

}
