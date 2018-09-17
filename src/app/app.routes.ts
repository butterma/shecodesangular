import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ForgotComponent} from './forgot/forgot.component';
import {ResetComponent} from './reset/reset.component';
import {UserManagmentComponent} from './user-managment/user-managment.component';
import {EditModalComponent} from './edit-modal/edit-modal.component';
import {ChatComponent} from './chat/chat.component';
import {ForumsComponent} from './forums/forums.component';
import {ForumComponent} from './forums/components/forum/forum.component';
import { AdminGuard } from './guards/admin.guard';
import {PersonalInformationComponent} from './personal-information/personal-information.component';
const routes:Routes=[
    {path:'',component:HomeComponent},
    {path:'contact',component:ContactComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'forgot',component:ForgotComponent},
    {path:'user-managment',component:UserManagmentComponent,canActivate:[AuthGuard]&&[AdminGuard]},
    {path:'edit',component:EditModalComponent, canActivate:[AuthGuard]&&[AdminGuard]},
    {path:'reset/:token',component:ResetComponent},
    {path:'chat',component:ChatComponent},
    {path:'forums',component:ForumsComponent,canActivate:[AuthGuard]},
    {path:'forum',component:ForumComponent,canActivate:[AuthGuard]},
    {path:'personal-information', component:PersonalInformationComponent,canActivate:[AuthGuard]}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRouters{}