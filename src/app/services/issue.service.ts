import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri='http://localhost:8080';
  constructor(private http:HttpClient) { }

  getIssues(){
    return this.http.get(`${this.uri}/issues`);
  }

  getIssuueById(id){
    return this.http.get(`${this.uri}/issues/${id}`);
  }
}
