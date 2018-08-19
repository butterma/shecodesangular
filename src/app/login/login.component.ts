import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import{first} from 'rxjs/operators';

//import {UserService} from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loading=false;
  createForm:FormGroup;
  constructor(private authService:AuthService,private alertService:AlertService, private fb:FormBuilder,private router:Router) { 
    this.createForm=this.fb.group({
      username:['',Validators.required],
      password:''
    });

    //reset login status
    this.authService.logout();
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
        console.log(error.error.message);
        this.alertService.error(error.error.message);
        this.loading=false;
      });
}    
ngOnInit() {
  }

}
