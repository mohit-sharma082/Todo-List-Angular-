import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NotifierService } from '../notifier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  private authListenerSubs:Subscription;
  public userIsAuthenticated = false;

  constructor(private authService: AuthService,
    private notifierService:NotifierService
    ){

  }
  ngOnInit() {

    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    })
  }

  onLogout(){
    this.authService.logout();
    this.notifierService.showNotification("Logged Out Successfully!","Be Back Soon!")
  }

  ngOnDestroy() {

    this.authListenerSubs.unsubscribe();
  }
}
