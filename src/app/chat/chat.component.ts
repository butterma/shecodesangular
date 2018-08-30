import { Component, OnInit } from '@angular/core';
import {Action} from './model/action.enum';
import {Event} from './model/event.enum';
import {Message} from './model/message';
import {User} from '../models/user.model';
import {SocketService} from './services/socket.service';
import { throwMatDuplicatedDrawerError } from '@angular/material';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  action=Action;
  user:User;
  message:Message[]=[];
  messageContent:string;
  ioConnection:any;

  constructor(private socketService:SocketService) { }

  ngOnInit():void {
    this.initIoConnection();
  }

  private initIoConnection():void{
    this.socketService.initSocket();

    this.ioConnection=this.socketService.onMessage()
      .subscribe((message:Message)=>{
        this.message.push(message);
      });
    this.socketService.onEvent(Event.CONNECT)
      .subscribe(()=>{
        console.log('connected');
      });
      
    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(()=>{
        console.log('disconnected');
      });
  }
  public sendMessage(message:string):void{
  if(!message){
    return;
  }

  this.socketService.send({
    from:this.user,
    content:message
    //add details
  });
  this.messageContent=null;
  }

  public sendNotification(params:any,action:Action):void{
  let message:Message;

  if(action===Action.JOINED){
    message={
      from:this.user,
      action:action
    }
  }
  else if(action===Action.RENAME){
    message={
      action:action,
      content:{
        username:this.user.username,
        previousUsername:params.previousUsername
      }
    };
  }
  this.socketService.send(message);
  }

  
}
