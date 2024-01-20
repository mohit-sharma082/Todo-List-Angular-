import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotifierService } from 'src/app/notifier.service';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{

  isLoading = false;

  private authListenerSubs:Subscription;

  constructor( public authService: AuthService,
    private notifierService:NotifierService){

  }
  ngOnInit() {
    this.authListenerSubs=this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isLoading=isAuthenticated;
    })
  }

  onSignup(form:NgForm){
    if(form.invalid){
      if (form.value.password.length <=0) {
        this.notifierService.showNotification("Please set a strong password for your account !", "Okay!")
        return;
      }
      else {
        this.notifierService.showNotification("Please enter a valid email address ", "OK")
        return;
      }
    }


    if( form.value.password.length <= 7){
      this.notifierService.showNotification("Please set a strong password (atleast 8 characters)","OK!")
      return;
    }else{

    this.isLoading = true;

      const auth : AuthData = {
        email: form.value.email,
        password : form.value.password
      }

      this.authService.createUser(auth);

    }
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe()
  }

}
