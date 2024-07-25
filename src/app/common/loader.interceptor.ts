import { Globals } from './globals';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse,HttpErrorResponse }
from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { finalize } from "rxjs/operators";
import { retry, catchError } from 'rxjs/operators';


@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private globals: Globals) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.globals.setglobalSpinner(true);
    return next.handle(req).pipe(
        finalize(() => { 
          // setTimeout(() => {
          //   this.globals.setglobalSpinner(false);
          // }, 500);
      })
    )
  }
}
