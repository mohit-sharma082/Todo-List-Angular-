import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.css']
})
export class ErrorNotificationComponent implements OnInit{

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any,
  public snackBarRef: MatSnackBarRef<ErrorNotificationComponent>){

  }
  ngOnInit() {

  }

}
