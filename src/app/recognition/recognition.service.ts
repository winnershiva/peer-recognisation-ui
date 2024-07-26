import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RecognitionService {

  public headers: any;
  // myStorageData = JSON.parse(localStorage.getItem('jwt') || '{}');

  myStorageData = JSON.parse(localStorage.getItem('jwt') || '{}');

  constructor(private http : HttpClient) {
    console.log("local data", this.myStorageData.jwt);
    
    this.headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + this.myStorageData.jwt
    };
  } 

  public searchPerson(name: any):Observable<any> {

    const httpOptions = { headers: new HttpHeaders(this.headers) };
    return this.http.get(environment.recognitionUrl + "search/employee/" + name, httpOptions);
  }

  public getAllEmployeeDetails():Observable<any> {

    const httpOptions = { headers: new HttpHeaders(this.headers) };
    return this.http.get(environment.recognitionUrl + "getAllEmployeeDetails", httpOptions);
  }

  public submitRecognition(payload:any,giverId: any, receiverId: any):Observable<any> {
    const httpOptions = { headers: new HttpHeaders(this.headers) };
    return this.http.post(environment.recognitionUrl + 'recognize/' + giverId + '/' + receiverId, payload, httpOptions)
  }
}
