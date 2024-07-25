import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

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
    const data = payload;
    return this.http.post(environment.recognitionUrl + "login", data, httpOptions);
  }

}
