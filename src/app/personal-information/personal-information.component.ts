import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  personalForm:FormGroup;
  user:User;
  constructor(private userService:UserService,private fb:FormBuilder) {
    this.personalForm=this.fb.group({
      username:['',Validators.required],
      role:'',
      branch:'',
      course:'',
      approved:''
    });
   }

  
  ngOnInit() {
    this.fetchUser();
  }

  fetchUser(){
    this.userService.getUsereByUsername(JSON.parse(sessionStorage.getItem('currentUser')))
      .subscribe((data:User)=>{
        console.log(data);
        this.user=data;
        this.personalForm.get('username').setValue(this.user.username);
        this.personalForm.get('role').setValue(this.user.role);
        this.personalForm.get('branch').setValue(this.user.branch);
        this.personalForm.get('course').setValue(this.user.course);
        this.personalForm.get('approved').setValue(this.user.approved);
      });

      this.personalForm.get('username').disable();
        this.personalForm.get('role').disable();
        this.personalForm.get('branch').disable();
        this.personalForm.get('course').disable();
        this.personalForm.get('approved').disable();
  }

}
