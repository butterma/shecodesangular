import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import{first} from 'rxjs/operators';

//import {UserService} from '../services/user.service';
import { MyAuthService } from '../services/my-auth.service';
import { AlertService } from '../services/alert.service';
import {AutoLogoutService} from '../services/auto-logout.service';
import {AuthService,FacebookLoginProvider,GoogleLoginProvider, SocialLoginModule} from 'angular-6-social-login';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
   loading=false;
  createForm:FormGroup;
  autoLogoutService:AutoLogoutService;
 
  constructor(private authService:MyAuthService,private alertService:AlertService, 
    private fb:FormBuilder,private router:Router,private socialAuthService:AuthService,private userService:UserService) { 
    this.createForm=this.fb.group({
      username:['',Validators.required],
      password:''
    });

    //reset login status
    this.authService.logout();
    //start autologout service
    this.autoLogoutService=new AutoLogoutService(this.authService);
      
    console.log("in login ctor");
  }

  public socialLogin(socialPlatform:string){
    console.log("in social login");
    let socialPlatformProvider;
    if(socialPlatform=="facebook"){
      socialPlatformProvider=FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform=="google"){
      console.log("set social provider");
      socialPlatformProvider=GoogleLoginProvider.PROVIDER_ID;
    }
    console.log("provider: "+socialPlatform);
    console.log(socialPlatformProvider);
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData)=>{
        console.log(socialPlatform+" sign in data : ",userData);
        //signin with userData
        if(userData.email)
        {
        sessionStorage.setItem('currentUser',JSON.stringify({user:userData.email})); //save to local storage
        this.userService.getUsereByUsername({user:userData.email}).subscribe(
          user=>{
            if (!user)
            {
              console.log("no user found, save user");
              this.userService.addUser({
                username:userData.email,
                image:userData.image,
                approved:true
              }).subscribe(
                data=>{
                  console.log("navigate to home page");
                  this.router.navigate(['/']);
                }
              ); 
            }
            else
            {
              console.log("navigate to home page");
              this.router.navigate(['/']);            
          }
        }
        );        
      }
    }
   );
  }
login(username,password){
  console.log("new login function");
  this.loading=true;
  this.authService.login(username,password)
    .pipe(first())
    .subscribe(
      data=>{
        this.router.navigate(['/']);
      },
      error=>{
        console.log(error.error);
        //console.log(error.error.message);
        this.alertService.error(error.error);
        this.loading=false;
      });
}    
ngOnInit() {
  }

}
