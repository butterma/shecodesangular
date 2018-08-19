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
        if(user && user.token){
        //store user details and jwt
        localStorage.setItem('currentUSer',JSON.stringify(user));  
        }
        return user;
      }));
  }

  logout(){
    //remove user from local storage
    localStorage.removeItem('currentUser');
  }

  reset(pass){
    return this.http.post<any>(`${this.uri}/reset/:token`,{password:pass});
  }
}
