import { Injectable,ViewChild, ElementRef, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Message } from '../model/message';
import * as SocketIOFileUpload  from 'socketio-file-upload';
import {DOCUMENT} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket=io.connect('http://localhost:3000/chat');

  //@ViewChild('siofuInput')siofuInput:ElementRef;
  @ViewChild('marioChat')marioChat:ElementRef;
  constructor(/*@Inject(DOCUMENT)document*/) { 
    //var socket = io.connect();
    //console.log(this.input.nativeElement);
    console.log("print");
    //console.log(this.marioChat.nativeElement);
    //console.log(document.getElementById('siofu_input'))
      var uploader = new SocketIOFileUpload(this.socket);
      //uploader.listenOnInput(document.getElementById('siofu_input'));
  }

  joinRoom(data){
    console.log(data);
    this.socket.emit('join',data);
    console.log("finish joinRoom");
  }

  sendMessage(data){
    this.socket.emit('message',data);
  }

  newMessageRecived(){
    const observable=new Observable<Message>(observer=>{
      this.socket.on('message',(data)=>{
        observer.next(data);
      });
      return()=>{
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data){
    this.socket.emit('typing',data);
  }

  receivedTyping(){
    const observable=new Observable<{isTyping:boolean}>(observer=>{
      this.socket.on('typing',(data)=>{
        observer.next(data);
      });
      return ()=>{
        this.socket.disconnect();
      };
    });
    return observable;
  }

  newMemeber(){
    console.log("in new member");
    const observable=new Observable<Message>(observer=>{
      this.socket.on('joined',(data)=>{
        console.log('new member joined');
        let message:Message= new Message(data.user,'joined the room',new Date(),null);
        console.log(message);
        observer.next(message);
      }/*,
    error=>{
      console.log(`Error: ${error}`);
    }*/);
    });
    return observable;
  }

  uploadFile(file)
  {
    console.log("uploading file " + JSON.stringify(file));
  }
  
}
