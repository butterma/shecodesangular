import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri='http://localhost:3000';
  myToken="";
  constructor(private http:HttpClient) {
    
   }

  addUser(email,password,branch,course){
    const user={
      username:email,
      password:password,
      branch:branch,
      course:course,
      approved:false      
    };
    return this.http.post(`${this.uri}/users/signup`,user);
  }

  sendMail(email){
    return this.http.post(`${this.uri}/users/sendMail`,{email:email});
  }
  getUsers(){
    return this.http.get(`${this.uri}/users`);
  }

  getUserById(id){
    console.log("in get by id "+id);
    return this.http.get(`${this.uri}/users/${id}`);
  }

  updateUser(id,email,password,role,course,branch){
    const user={
      username:email,
      password:password,
      role:role,
      course:course,
      branch:branch
    };
    return this.http.post(`${this.uri}/users/update/${id}`, user);
  }

  deleteUser(id){
    return this.http.get(`${this.uri}/users/delete/${id}`);
  }

  updateUserPassword(pass){
    console.log("in update user password func");
    this.myToken=window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    return this.http.post(`${this.uri}/users/reset/:token`,{password:pass,token:this.myToken});
  }
}
