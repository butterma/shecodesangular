import { Component, OnInit } from '@angular/core';

import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../services/user.service';
import { first } from '../../../node_modules/rxjs/operators';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  createForm:FormGroup;

  constructor(private userService:UserService,private alertService:AlertService, private fb:FormBuilder,private router:Router) {
    this.createForm=this.fb.group({
      password:'',
      confirmPassword:''
    });
   }
   reset(pass){
     console.log("new password: "+pass);
     this.userService.updateUserPassword(pass)
     .pipe(first())
     .subscribe(
       data=>{
       console.log("send new password");
       this.alertService.success("Password reset succefully");
       this.router.navigate(['/login']);
       },
       error=>{
        this.alertService.error(error.error.message);
       });
   }
  ngOnInit() {
  }

}
