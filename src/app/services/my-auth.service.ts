import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  uri='http://localhost:3000';

  constructor(private http:HttpClient) { }

  login(username:string,password:string){
    console.log('in authservice:login');
    return this.http.post<any>(`${this.uri}/users/login`,{username:username,password:password})
      .pipe(map(result=>{
        console.log('in login authservice');
        //login successful if there's a jwt token in the reponse
        console.log(result);
        if (result.status === "Login successfully")
        {
        //store user details and jwt
        console.log('save user in session storage');
        sessionStorage.setItem('currentUser',JSON.stringify(result));  
        console.log(JSON.parse(sessionStorage.getItem('currentUser')).role);
        }
        return username;
      }));
  }

  loginWithGooglePlus(username:string,password:string){
    console.log('in authservice:loginWithGooglePlus');
    return this.http.get(`${this.uri}/users/auth/google`)
      /*.pipe(map(result=>{
        console.log('in login authservice');
        //login successful if there's a jwt token in the reponse
        console.log(result);
        if (result.user === "Login successfully")
        {
        //store user details and jwt
        console.log('save user in session storage');
        console.log(JSON.stringify(result));
        sessionStorage.setItem('currentUser',JSON.stringify(result));  
        //}
        return username;
      }));*/.subscribe(data=>{
        console.log(data);
      });
  }

  loginWithFacebook(username:string,password:string){
    console.log('in authservice:loginWithFacebook');
    return this.http.post<any>(`${this.uri}/users/auth/facebook`,{username:username,password:password})
      .pipe(map(result=>{
        console.log('in login authservice');
        //login successful if there's a jwt token in the reponse
        console.log(result);
        if (result.user === "Login successfully")
        {
        //store user details and jwt
        console.log('save user in session storage');
        console.log(JSON.stringify(username));
        sessionStorage.setItem('currentUser',JSON.stringify(username));  
        }
        return username;
      }));
  }

  loggedIn(){
    const user=JSON.parse(sessionStorage.getItem('currentUser'));
    return user!=null?true:false;
  }
  getLoggedInUser(){
    return JSON.parse(sessionStorage.getItem('currentUser')).user;
  }

  getLoggedInUserRole(){
    return JSON.parse(sessionStorage.getItem('currentUser')).role;
  }

  isAdmin()
  {
    const role=JSON.parse(sessionStorage.getItem('currentUser')).role;
    return role==='Admin'?true:false;
  }
  logout(){
    //remove user from local storage
    console.log('in logout function');
    sessionStorage.removeItem('currentUser');
    return this.http.get(`${this.uri}/users/logout`);
  }

  reset(pass){
    console.log('in authservice:reset');
    return this.http.post<any>(`${this.uri}/reset/:token`,{password:pass});
  }
}
