import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {SocketService} from '../../services/socket.service';
import {AuthService} from '../../../services/auth.service';
import {MaterialModule} from '../../../material.module';
import {Message} from '../../model/message';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  private isTyping=false;
  messageArray:Array<Message>=[];
  private chatroom="Web";
  private message:String;
  

  constructor(private router:Router,private route:ActivatedRoute,private socketService:SocketService,private authService:AuthService) { 
    console.log("in forum constructor");
    this.socketService.newMessageRecived().subscribe(data=>{
      this.messageArray.push(data);
      console.log("message array: ");
      console.log(this.messageArray);
      this.isTyping=false;
    });
    this.socketService.receivedTyping().subscribe(bool=>{
      this.isTyping=bool.isTyping;
    });
    this.socketService.newMemeber().subscribe(data=>{
      console.log(data);
      this.messageArray.push(data);
      console.log("new member message array: ");
      console.log(this.messageArray);
       });
    console.log("finish forum construtor");
  }

  ngOnInit() {
    console.log("in forum ngOnInit");
    this.socketService.joinRoom({user:this.authService.getLoggedInUser()/*.username*/,room:this.chatroom});
    console.log("finish ngOnInit");
  }

  sendMessage(){
    console.log("in send message");
    this.socketService.sendMessage({room:this.chatroom,user:this.authService.getLoggedInUser(),message:this.message});
    this.messageArray.push(new Message(this.authService.getLoggedInUser(),this.message,new Date()));
    this.message='';
  }
  typing(){
    console.log("in typing");
    this.socketService.typing({room:this.chatroom,user: this.authService.getLoggedInUser()});
  }
}
