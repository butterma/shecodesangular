import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }
  uri="http://localhost:3000";
  
  getChats(){
    return this.http.get(`${this.uri}/chat`);
  }
  getChatsByRoom(room){
    return this.http.get(`${this.uri}/chat/${room}`);
  }

}
