import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotifierService } from 'src/app/notifier.service';
import { TasksService } from 'src/app/tasks/tasks.service';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  isLoading = false;

  private authListenerSubs:Subscription;

  constructor( public authService: AuthService,
    private notifierService:NotifierService,
    public tasksService:TasksService
    ){

  }

  ngOnInit() {
    this.authListenerSubs=this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated=>{
      this.isLoading=isAuthenticated;
    })

    this.authService.getUserId();

  }

  onLogin(form:NgForm){
    if(form.invalid){
      if (form.value.password.length <=0) {
        this.notifierService.showNotification("Please enter the correct password", "Okay!")
        return;
      }
      else {
        this.notifierService.showNotification("Please enter a valid email address ", "OK")
        return;
      }

    }

  this.isLoading = true;

  const auth : AuthData = {
    email: form.value.email,
    password : form.value.password
  }

  this.authService.login(auth);


  this.tasksService.getTasks();
}


ngOnDestroy(){
  this.authListenerSubs.unsubscribe()
}

}
