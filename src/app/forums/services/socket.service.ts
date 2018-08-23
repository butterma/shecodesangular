import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket=io('http://localhost:3000/chat');

  constructor() { }

  joinRoom(data){
    console.log(data);
    this.socket.emit('join',data);
  }
  sendMessage(data){
    this.socket.emit('message',data);
  }
  newMessageRecived(){
    const observable=new Observable<{user:string,message:String}>(observer=>{
      this.socket.on('new message',(data)=>{
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
}
