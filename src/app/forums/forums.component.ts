import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from '../services/chat.service';
import {UserService} from '../services/user.service';
import {MyAuthService} from '../services/my-auth.service';
import {User} from '../models/user.model';
import {ModalModule} from 'angular-custom-modal';
import {Message} from './model/message';
@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {

  private isTyping=false;
  forums:String[];
  staticSuggestedForums=['Career','MeetUp','Lectures'];
  suggestedForums:String[];//=this.staticSuggestedForums.filter(x=>this.forums.indexOf(x)<0);
  displayedColumns=['name','action'];
  columns=['name','myAction'];
  constructor(private router:Router,private modalModule:ModalModule, private authService:MyAuthService, private chatService:ChatService,private userService:UserService) {
    
   }

  ngOnInit() {
    this.fetchForums();
  }
  
  fetchForums(){
    //TODO: get user's forum list
    console.log("fetch forums");
    this.userService.getUsereByUsername(JSON.parse(sessionStorage.getItem("currentUser")))

    .subscribe((data:User)=>{
      if(data){
        this.forums=data.forums;
        this.suggestedForums=this.staticSuggestedForums.filter(x=>this.forums.indexOf(x)<0);
        console.log(data);
        console.log("Data request....");
      }
    },
    error=>{
      this.suggestedForums=this.staticSuggestedForums;
      console.log(error);
    });
  }

  //open specific forum
  openForum(forum){
    this.router.navigate(['/forum'],{queryParams:{forum:forum}});
  }

  joinForum(forumName){
    this.userService.addForumToUser(JSON.parse(sessionStorage.getItem('currentUser')).user,forumName)
      .subscribe((data)=>{
        console.log(data);
        this.fetchForums();
      });
  }

  addForum(forumName){
    console.log("forum to add: "+forumName);
    this.staticSuggestedForums.push(forumName);
    console.log(this.staticSuggestedForums);
    this.fetchForums();
  }

}
