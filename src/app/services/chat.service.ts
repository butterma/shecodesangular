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
    console.log("get chats by room: " + room);
    return this.http.get(`${this.uri}/chat/rooms/${room}`);
  }

  updateMessageById(id, username, operation){
    if (operation == "like")
    {
      console.log("chatservice.like");
      return this.http.post(`${this.uri}/chat/like/:id`,{username:username});      
    }

    else if (operation == "dislike")
    {
      console.log("chatservice.dislike");
      return this.http.post(`${this.uri}/chat/dislike/:id`,{username:username}); 
    } 
  }
}
