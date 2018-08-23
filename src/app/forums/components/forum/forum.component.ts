import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {SocketService} from '../../services/socket.service';
import {AuthService} from '../../../services/auth.service';
import {MaterialModule} from '../../../material.module';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  private isTyping=false;
  messageArray:Array<{user:String,message:String}>=[];
  private chatroom="Web";
  private message:String;

  constructor(private router:Router,private route:ActivatedRoute,private socketService:SocketService,private authService:AuthService) { 
    console.log("in forum constructor");
    this.socketService.newMessageRecived().subscribe(data=>{
      this.messageArray.push(data);
      this.isTyping=false;
    });
    this.socketService.receivedTyping().subscribe(bool=>{
      this.isTyping=bool.isTyping;
    });
    this.socketService.newMemeber().subscribe(data=>{
      this.messageArray.push({user:data.user,message:data.content});
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
    this.message='';
  }
  typing(){
    console.log("in typing");
    this.socketService.typing({room:this.chatroom,user: this.authService.getLoggedInUser()});
  }
}
