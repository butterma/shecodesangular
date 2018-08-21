import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { AppComponent } from './app.component';


import {FlexLayoutModule} from '@angular/flex-layout';
import {AlertComponent} from './alert/alert.component';
import { ContactComponent } from './contact/contact.component';
import {AppRouters} from './app.routes';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
//import {IssueService} from './services/issue.service';
import {UserService} from './services/user.service';
import { MatSelectModule } from '@angular/material';
import { ResetComponent } from './reset/reset.component';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import {ModalService} from './services/modal.service';
import { ChatModule } from './chat/chat.module';
import { ForumsModule } from './forums/forums.module';
@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ForgotComponent,
    ResetComponent,
    AlertComponent,
    UserManagmentComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
   // RouterModule.forRoot(routes),
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    AppRouters,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    ChatModule,
    ForumsModule,
  ],
  providers: [/*IssueService,*/
    UserService,
    AlertService,
    AuthService,
    ModalService
  ],
  bootstrap: [AppComponent],
  entryComponents:[EditModalComponent]
})
export class AppModule { }
