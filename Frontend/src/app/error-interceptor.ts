import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { NotifierService } from "./notifier.service";

@Injectable()

export class ErrorInterceptor implements HttpInterceptor{

    constructor(
      public notifierService:NotifierService
    ){
    }

    intercept( req:HttpRequest<any> , next:HttpHandler){


      return next.handle(req).pipe(
        catchError((err:HttpErrorResponse)=>{
          console.log( "Our error Interceptor" , err);
          this.notifierService.showErrorMessage((err.error.status.message),"Okay !")
          return throwError(err);
        })
      );
    }
}
