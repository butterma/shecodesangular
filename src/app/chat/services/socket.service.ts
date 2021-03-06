import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Message} from '../model/message';
import {Event} from '../model/event.enum';

import * as socketIo from 'socket.io-client';

const server_uri='http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;
  public initSocket():void{
    this.socket=socketIo(server_uri);
  }
  public send(message:Message):void{
    this.socket.emit('message',message);
  }

  public onMessage():Observable<Message>{
    return new Observable<Message>(observer=>{
      this.socket.on('message',(data:Message)=>observer.next(data));
    });
  }

  public onEvent(event:Event):Observable<any>{
    return new Observable<Event>(observer=>{
      this.socket.on(event,()=>observer.next());
    });
  }
  constructor() { }
}
