import { Component, OnInit } from '@angular/core';

import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {AlertService} from '../services/alert.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

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

  selectedFile : File = null;

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
  constructor(private http: HttpClient,private userService:UserService,private alertService:AlertService, private fb:FormBuilder,private router:Router) { 
    this.createForm=this.fb.group({
      username:['',Validators.required],
      password:'',
      confirmPassword:''
    });
  }


   signup(username,password,confirmPassword,branch,course){
     console.log(username+" "+password+" "+branch+" "+course );
     if (username == "" || password == "" ||confirmPassword == "" || branch == "" || course == "" || this.selectedFile == null)
     {
        this.alertService.error("you didn't fill in all the fields");
        return;
      }

      if (password != confirmPassword){
        console.log("the confirm password is not the same as the password");
        this.alertService.error("the confirm passord is not the same as the password");
        return;
      }
      console.log("success");
     const upLoadData=new FormData();
    upLoadData.append('username',username);
    upLoadData.append('password',password);
    upLoadData.append('branch',branch);
    upLoadData.append('course',course);
    upLoadData.append('approved','0');
    if (this.selectedFile)
      upLoadData.append('image',this.selectedFile,"localhost:3000/public/uploads/" + this.selectedFile.name);
      else upLoadData.append('image','');
    this.userService.addUser(upLoadData)
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

  url: String;
onFileChanged(event) { // called each time file input changes
  console.log("onFileChanged");
    if (event.target.files && event.target.files[0]) {
        {
          console.log("there is a file");
          this.selectedFile = <File>event.target.files[0];
        }
      }
    }
}
  
