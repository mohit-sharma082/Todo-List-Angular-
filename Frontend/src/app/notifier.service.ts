import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor( private snackBar: MatSnackBar ) {  }

  showNotification( displayMessage: string, buttonText: string){
    this.snackBar.open( displayMessage, buttonText, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
  }

  showErrorMessage( displayMessage: string, buttonText: string ){
    this.snackBar.openFromComponent( ErrorNotificationComponent ,{
      data:{
        message:displayMessage,
        buttonText:buttonText
      },
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass:'error',
    })
  }


}
