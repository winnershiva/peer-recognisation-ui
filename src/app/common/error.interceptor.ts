import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Globals } from '../common/globals';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {
    constructor( private globals : Globals) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    
          if (error.error && error.error.message && error.error.message.length >0) {
            errorMessage =error.error.message;
          }else{
            errorMessage ='Something went wrong. Please try again after sometime';
          }
          
           if (error.status === 0) {       
            errorMessage="Somthing went wrong with network, please try again later";
           }

           if(error.status == 400 || error.status == 500) {
            // errorMessage ='Something went wrong. Please try again after sometime';  
           }

           if(error.status != 200 && error.status != 409 && error.status != 500 && error.status != 400 && error.status != 401 && error.status != 0 && error.status != 403) {
            errorMessage ='Something went wrong. Please try again after sometime'; 
           }
                    alert(errorMessage)

                    this.globals.setglobalSpinner(false);
                    return throwError(errorMessage);
                })
            )

            
    }
   
}

