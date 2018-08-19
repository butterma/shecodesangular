import { Component, OnInit } from '@angular/core';

import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {AlertService} from '../services/alert.service';
export interface Item{
  value:string;
  viewValue:string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  courses:Item[]=[
    {value:'python',viewValue:'python'},
    {value:'web',viewValue:'web'},
    {value:'android',viewValue:'android'},
    {value:'data analysis',viewValue:'data analysis'}
  ];
  roles:Item[]=[
    {value:'admin',viewValue:'Admin'},
    {value:'areaManger',viewValue:'Area Manger'},
    {value:'branchManger',viewValue:'Branch Manger'},
    {value:'courseCoordinator',viewValue:'Course Coordinator'},
  ];
  branches:Item[]=[
    {value:'cisco',viewValue:'Cisco'},
    {value:'HUJI',viewValue:'HUJI'},
    {value:'TAU',viewValue:'TAU'},
    {value:'BGU',viewValue:'BGU'},
    {value:'google',viewValue:'Google'},
    {value:'IBM',viewValue:'IBM'},
    {value:'wix',viewValue:'WIX'},
    {value:'technion',viewValue:'Technion'},
  ];

  createForm:FormGroup;
  loading=false;
  constructor(private userService:UserService,private alertService:AlertService, private fb:FormBuilder,private router:Router) { 
    this.createForm=this.fb.group({
      username:['',Validators.required],
      password:'',
      confirmPassword:''
    });
  }
   signup(username,password,branch,course){
     console.log(username+" "+password+" "+branch+" "+course);
    this.userService.addUser(username,password,branch,course)
      .pipe(first())
      .subscribe(
        data=>{
          this.alertService.success('Registration success');
          this.router.navigate(['/login']);
        },
        error=>{
          this.alertService.error(error);
          this.loading=false;
        });
   }
  ngOnInit() {
  }
  
}
