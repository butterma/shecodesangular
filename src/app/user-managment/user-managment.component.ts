import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';

import {MatTableDataSource} from '@angular/material';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';
import {ModalService} from '../services/modal.service';

export interface Item{
  value:string;
  viewValue:string;
}

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  courses:Item[]=[
    {value:'python',viewValue:'python'},
    {value:'web',viewValue:'web'},
    {value:'android',viewValue:'android'},
    {value:'data analysis',viewValue:'data analysis'}
  ];
  roles:Item[]=[
    {value:'Admin',viewValue:'Admin'},
    {value:'Area manager',viewValue:'Area Manger'},
    {value:'Branch manager',viewValue:'Branch Manger'},
    {value:'Course coordinator',viewValue:'Course Coordinator'},
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
  users:Array<User>;
  displayedColumns=['username','branch','course','approved','actions'];
  updateForm:FormGroup;
  user:any={};
  id:string;

  constructor(private userService:UserService,private router:Router,private modalService:ModalService,private fb:FormBuilder,private route:ActivatedRoute) {
    this.updateForm=this.fb.group({
      username:['',Validators.required],
      role:'',
      branch:'',
      course:'',
      approved:''
    });
   }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(){
    console.log("fetch users");
    this.userService.getUsers()
    .subscribe((data:Array<User>)=>{
      this.users=data;
      console.log('Data requested......');
    });
  }

  
  editUser(id){
    console.log("edit user func");
    this.modalService.open('edit-modal');

    this.route.params.subscribe(params=>{
      this.userService.getUserById(id).subscribe(res=>{
        this.user=res;
        this.id=id;
        this.updateForm.get('username').setValue(this.user.username);
        this.updateForm.get('role').setValue(this.user.role);
        this.updateForm.get('branch').setValue(this.user.branch);
        this.updateForm.get('course').setValue(this.user.course);
        this.updateForm.get('approved').setValue(this.user.approved);
      });
    });
    let ctrl=this.updateForm.get('username');
    ctrl.disable();
   // this.router.navigate(['/edit/${id}']);
  }
  deleteUser(id){
    this.userService.deleteUser(id).subscribe(()=>{
      this.fetchUsers();
    });
  }

  updateUser(username, role, branch,course,approved){
    this.userService.updateUser(this.id,username,this.user.password,role,branch,course,approved)
    .subscribe(()=>{
    this.closeModal('edit-modal');
    this.fetchUsers();
});
}
    
  /*openModal(id:string){
    this.modalService.open(id);
  }*/
  closeModal(id:string){
    this.modalService.close(id);
  }
}
