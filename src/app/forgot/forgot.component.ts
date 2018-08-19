import { Component, OnInit } from '@angular/core';

import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  createForm:FormGroup;
  constructor(private userService:UserService,private fb:FormBuilder,private router:Router) { 
    this.createForm=this.fb.group({
      username:['',Validators.required]
    });
  }

  sendMail(email){
    this.userService.sendMail(email).subscribe(()=>{
      console.log("send reset message");
      this.router.navigate(['/login']);
    });
  }
  ngOnInit() {
  }

}
