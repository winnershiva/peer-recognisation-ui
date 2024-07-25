import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public headers: any;

  myStorageData = (localStorage.getItem('jwt'));

  constructor(private http : HttpClient) {
    this.headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + this.myStorageData
    };
  } 

  public getEarnedBadges(name:any):Observable<any> {

    return this.http.get(environment.recognitionUrl + "get/earned-recognitions/" + name);
  }


}
