import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RecognitionService {

  public headers: any;
  myStorageData = (localStorage.getItem('jwt'));

  constructor(private http : HttpClient) {
    this.headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + this.myStorageData
    };
  } 

  public searchPerson(name: any):Observable<any> {
    const httpOptions = { headers: new HttpHeaders(this.headers) };
    return this.http.get(environment.recognitionUrl + "search/employee/" + name);
  }
}
