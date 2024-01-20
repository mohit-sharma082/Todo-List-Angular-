import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { NotifierService } from "../notifier.service";

@Injectable({ providedIn: "root" })

export class AuthService {

    tokenTimer= null;

    private userId = null;

    private token: string;

    private authStatusListener = new Subject<boolean>();

    private authStatus = false;

    constructor(private http:HttpClient, private router:Router,
      private notifierService:NotifierService){

    }

    getAuthStatus(){
        return this.authStatus;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    getToken(){
      return this.token;
    }

    getUserId(){
      return localStorage.getItem('userId');
    }

    createUser(authData: AuthData){
      return this.http
      .post("https://backend-service-for-my-todolist-mean.onrender.com/api/users/signup", authData)
      .subscribe((resp) => {
        console.log(resp);
        this.router.navigate(['/login']);
        this.notifierService.showNotification("SignUp Successful!","Let's Go!!");
      },
        error => {
          console.log(error);
          this.authStatusListener.next(false);
          this.router.navigate(['/login']);
          this.notifierService.showNotification("Please Login!","Ok")
      });

    }

    autoAuthUser(){
      const authInfo = this.getAuthData();
      if(authInfo){
        const expiresIn = authInfo.expirationDate.getTime() - (new Date()).getTime();
        if(expiresIn > 0){
          this.token = authInfo.token;
          this.authStatus = true;
          this.authStatusListener.next(true);
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, expiresIn);
        }
      }

    }
    // Login ==============
    login(authData: AuthData){
        this.http
        .post<{status:{}, data:{token:string, expiresIn:number , userId: string }}>("https://backend-service-for-my-todolist-mean.onrender.com/api/users/login", authData)
        .subscribe((resp) => {
            console.log(resp);
            this.token = resp.data.token;

            if( this.token){
              const expiresIn = resp.data.expiresIn;
              this.tokenTimer = setTimeout(() => {
                  this.logout();
              }, expiresIn*1000);

              const now = new Date();
              const expirationDate = new Date( now.getTime() + expiresIn*1000);

              this.userId = resp.data.userId;

              this.saveAuthData(this.token, expirationDate, this.userId);

              this.authStatusListener.next(true);
              this.authStatus = true;
              this.router.navigate(['/']);
              this.notifierService.showNotification("Logged in successfully!","Awesome!")
            }
          }
          // ,
          // error => {
          //   console.log(error);
          //   this.authStatusListener.next(false);
          //   // this.notifierService.showNotification("Invalid Credentials!!","Ok")
          // }
        )


    }

    logout(){
        this.token = null;
        this.userId = null;
        this.authStatus = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/login']);
    }

    private saveAuthData( token:string , expirationDate: Date, userId:string){
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("expiration", expirationDate.toISOString());
    }

    private clearAuthData( ){
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");

    }
    private getAuthData(){
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const expirationDate = localStorage.getItem("expiration");
      if(token){
        return {
          token: token,
          expirationDate: new Date(expirationDate),
          userId: userId
        }
      }
    }
}
