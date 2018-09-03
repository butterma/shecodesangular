import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
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
  messageArray:Array<Message>=[];
  private chatroom="Web";
  private message:String;
  private likes:number;
  private dislikes:number;
  private pressedLike:Boolean;
  private pressedDisLike:Boolean;
  private firstPress:Boolean;
  private fileNgModel:File;
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

  constructor(private router:Router,private route:ActivatedRoute,private socketService:SocketService,private authService:MyAuthService, private fb: FormBuilder) {
    this.form.get('fileInput').valueChanges.subscribe(path => 
      {        
        console.log(path);       
      });
    console.log("in forum constructor");
    this.socketService.newMessageRecived().subscribe(data=>{
      this.messageArray.push(data);
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

  ngOnInit() {
    console.log("in forum ngOnInit");
    this.socketService.joinRoom({user:this.authService.getLoggedInUser()/*.username*/,room:this.chatroom});
    console.log("finish ngOnInit");
  }

  sendMessage(){
    console.log("in send message");
    console.log(this.selectedFile);
    //console.log("files: "+this.fileUploader.uploadMsgText);//JSON.stringify(this.files));    
    this.socketService.sendMessage({room:this.chatroom,user:this.authService.getLoggedInUser(),message:this.message,file:this.selectedFile});
    this.messageArray.push(new Message(this.authService.getLoggedInUser(),this.message,new Date(),this.selectedFile));
    this.message='';
  }

  typing(){
    console.log("in typing");
    this.socketService.typing({room:this.chatroom,user: this.authService.getLoggedInUser()});
  }

  selectedFile : File = null;
  onFileChanged(event) { // called each time file input changes
    console.log("onFileChanged");
      if (event.target.files && event.target.files[0]) {
          {
            console.log("there is a file");
            this.selectedFile = <File>event.target.files[0];
          }
        }
      }  

      liked()
      {
        console.log("liked");
        if (this.firstPress) 
        {
          this.likes++;
          this.pressedLike = true;
          this.pressedDisLike = false;
          this.firstPress = false;
        }

        else
        {
          this.likes++;
          this.dislikes--;
          this.pressedLike =  !this.pressedLike;
          this.pressedDisLike = !this.pressedLike;
        }

        this.socketService.updateLikes("");
      }

      disliked()
      {
        console.log("dis liked");
        if (this.firstPress) 
        {
          this.dislikes++;
          this.pressedDisLike = true;
          this.pressedLike = false;
          this.firstPress = false;
        }

        else
        {
          this.dislikes++;
          this.likes--;
          this.pressedDisLike = !this.pressedDisLike;
          this.pressedLike =  !this.pressedDisLike;
        }
        
        this.socketService.updateLikes("");
      }
}
