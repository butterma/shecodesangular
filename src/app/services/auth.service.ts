import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri='http://localhost:3000';

  constructor(private http:HttpClient) { }

  login(username:string,password:string){
    return this.http.post<any>(`${this.uri}/users/login`,{username:username,password:password})
      .pipe(map(user=>{
        //login successful if there's a jwt token in the reponse
        console.log('in login authservice');
        if(user){
        //store user details and jwt
        console.log('save user in session storage');
        sessionStorage.setItem('currentUser',JSON.stringify(user));  
        }
        return user;
      }));
  }

  loggedIn(){
    const user=JSON.parse(sessionStorage.getItem('currentUser'));
    return user!=null?true:false;
  }
  getLoggedInUser(){
    console.log("in get loggedIn user");
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }
  logout(){
    //remove user from local storage
    sessionStorage.removeItem('currentUser');
  }

  reset(pass){
    return this.http.post<any>(`${this.uri}/reset/:token`,{password:pass});
  }
}
