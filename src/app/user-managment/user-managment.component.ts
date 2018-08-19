import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  users:Array<User>;
  displayedColumns=['username','branch','course','approved'];

  constructor(private userService:UserService,private router:Router) { }

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
    this.router.navigate([]);
  }
  deleteUser(id){
    this.userService.deleteUser(id).subscribe(()=>{
      this.fetchUsers();
    });
  }
}
