import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { RecognitionComponent } from './recognition/recognition.component';
import { LoginComponent } from './login/login.component';
import { RedeemComponent } from './redeem/redeem.component';

const routes: Routes = [

  {path : '', pathMatch : 'full', redirectTo : '/login'},
  {path : 'profile', component : ProfileComponent},
  {path : 'recognition', component : RecognitionComponent},
  {path : 'redeem', component : RedeemComponent},
  {path : 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
