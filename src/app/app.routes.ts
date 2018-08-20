import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ForgotComponent} from './forgot/forgot.component';
import {ResetComponent} from './reset/reset.component';
import {UserManagmentComponent} from './user-managment/user-managment.component';
import {EditModalComponent} from './edit-modal/edit-modal.component';
const routes:Routes=[
    {path:'',component:HomeComponent},
    {path:'contact',component:ContactComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'forgot',component:ForgotComponent},
    {path:'user-managment',component:UserManagmentComponent},
    {path:'edit',component:EditModalComponent},
    {path:'reset/:token',component:ResetComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRouters{}