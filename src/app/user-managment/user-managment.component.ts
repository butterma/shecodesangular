import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';
import {ModalService} from '../services/modal.service';
@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  users:Array<User>;
  displayedColumns=['username','branch','course','approved','actions'];

  constructor(private userService:UserService,private router:Router,private modalService:ModalService) { }

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
    this.modalService.open('edit-modal',id);
   // this.router.navigate(['/edit/${id}']);
  }
  deleteUser(id){
    this.userService.deleteUser(id).subscribe(()=>{
      this.fetchUsers();
    });
  }

  /*openModal(id:string){
    this.modalService.open(id);
  }
  closeModal(id:string){
    this.modalService.close(id);
  }*/
}
