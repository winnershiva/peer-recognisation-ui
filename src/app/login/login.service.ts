import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public headers: any;

  constructor(private http : HttpClient) {
    this.headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      
    };
  } 

  public loginIntoRecognition(payload:any):Observable<any> {
    const httpOptions = { headers: new HttpHeaders(this.headers) };
    const data = payload.data
    return this.http.post("http://localhost:9096/login", data, httpOptions);
  }

}
