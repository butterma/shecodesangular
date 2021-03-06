import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, Params} from '@angular/router';
import {SocketService} from '../../services/socket.service';
import {MyAuthService} from '../../../services/my-auth.service';
import {MaterialModule} from '../../../material.module';
import {Message} from '../../model/message';
import { ViewChild } from '@angular/core';
import {AngularFileUploaderComponent} from 'angular-file-uploader';
//import {SocketIOFileUploadModule}  from "socketio-file-upload";
import { Directive, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ChatService} from '../../../services/chat.service';
import { DomSanitizer } from '@angular/platform-browser';
import {Buffer} from 'buffer';
import { HttpRequest } from '@angular/common/http';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})

@Directive({
  selector: 'input[type=file]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ForumComponent, multi: true }
  ]
})

export class ForumComponent implements OnInit, ControlValueAccessor {
  @HostListener('change', ['$event.target.files']) onChange = (_: any) => { };
  @HostListener('blur') onTouched = () => { };

  writeValue(value: any) { }
  registerOnChange(fn: (_: any) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }

  private isTyping=false;
  messageArray:Array<Message>;
  private chatroom;
  private message:String;
  private likes:number;
  private dislikes:number;
  private pressedLike:Boolean;
  private pressedDisLike:Boolean;
  private firstPress:Boolean;
  private fileNgModel:File;
  private selectedFile : File = null;
  private fileName:String = null;
  @ViewChild('fileUploader')
  private fileUploader:AngularFileUploaderComponent;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.pdf,.docx,.txt,.gif,.jpeg",
    maxSize: "20",
    uploadAPI:  {
      url:"http://localhost:3000/chat/uploads",
      headers: {
     "Content-Type" : "text/plain;charset=UTF-8"
      }
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true
  };

  form = this.fb.group({
    fileInput: this.fb.control(''),
  });


  constructor(private router:Router,private route:ActivatedRoute,private socketService:SocketService,
    private authService:MyAuthService, private fb: FormBuilder,private chatService:ChatService,
    private sanitizer: DomSanitizer) {
    this.form.get('fileInput').valueChanges.subscribe(path => 
      {        
        console.log(path);       
      });
      this.messageArray=new Array<Message>();
    console.log("in forum constructor");
    this.socketService.newMessageRecived().subscribe(data=>{
      this.messageArray.push(data);
      console.log(data);
      console.log("message array: ");
      console.log(this.messageArray);
      this.isTyping=false;
      this.pressedDisLike = this.pressedLike = false;
      this.firstPress = true;
      
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

getMessages()
{
  console.log("get message");
  this.beforeSearch = true;
  //fetch last message by room
  this.chatService.getChatsByRoom(this.chatroom).subscribe(
    (data:Message[]) =>{
      console.log(data);
      this.messageArray=data;
      console.log("upload previous messages");
      console.log(this.messageArray);
    });
}

  ngOnInit() {
    console.log("in forum ngOnInit");
    this.route.queryParams.subscribe((params: Params) => {
      this.chatroom = params['forum'];
      console.log(this.chatroom);
    });
    this.socketService.joinRoom({user:this.authService.getLoggedInUser()/*.username*/,room:this.chatroom});
    this.getMessages();
    console.log("finish ngOnInit");
  }

  sendMessage(){
    console.log("in send message"); 
    if (this.selectedFile)
      this.fileName = this.selectedFile.name     
    this.socketService.sendMessage({room:this.chatroom,user:this.authService.getLoggedInUser(),message:this.message,file:this.selectedFile,fileName:this.fileName});
   // this.messageArray.push(new Message(this.authService.getLoggedInUser(),this.message,new Date(),this.selectedFile));
    this.getMessages(); 
   this.message='';
  }

  typing(){
    console.log("in typing");
    this.socketService.typing({room:this.chatroom,user: this.authService.getLoggedInUser()});
  }

  onFileChanged(event) { // called each time file input changes
    console.log("onFileChanged");
      if (event.target.files && event.target.files[0]) {
          {
            console.log("there is a file");
            this.selectedFile = <File>event.target.files[0];
          }
        }
  } 
 
  liked(id)
      {    
        console.log("id: "+id);
        this.chatService.updateMessageById(id, sessionStorage.getItem("currentUser"),"like")
          .subscribe();
        //this.getMessages();
      }

  disliked(id)
      {
        console.log("dis liked");
        this.chatService.updateMessageById(id, sessionStorage.getItem("currentUser"),"dislike");
        //this.getMessages();
      }

     
  downloadFile(buffer, name:string)
      {
        console.log((buffer.data));
        var data=buffer.data;
        console.log(data);
       /* var buf=Buffer.from(JSON.stringify(buffer.data));
        console.log(buf);*/
        const blob = new Blob([new Uint8Array(buffer.data)],{type:'application/*'});
        console.log(blob);
        //TODO: add to URL parameter forum (room?)
        //const fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        //this.router.navigate([fileUrl]);
       FileSaver.saveAs(blob, name);
      }

      
      private beforeSearch:Boolean = true;
      private listBeforeSearch:Array<Message>;
      //search  function
      findWord(word){
        if (this.beforeSearch)
        {
          this.beforeSearch = false;
          this.listBeforeSearch = this.messageArray;
        }
        console.log(word);
        var tempList=this.messageArray;
       this.messageArray= this.listBeforeSearch.filter(m=>m.content.includes(word));
      }
}
