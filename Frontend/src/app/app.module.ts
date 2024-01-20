import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CreateTaskComponent } from './tasks/create/create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';



import { HeaderComponent } from './header/header.component';
import { ListComponent } from './tasks/list/list.component';

import { AuthInterceptor } from './auth/auth-interceptor.service';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';




@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    ListComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ErrorNotificationComponent

  ],
  imports: [
    MatBadgeModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor, multi:true
    },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
