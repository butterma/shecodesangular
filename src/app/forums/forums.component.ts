import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from '../services/chat.service';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';
import {Message} from './model/message';
@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {

  private isTyping=false;
  forums:String[];
  displayedColumns=['name','action'];
  constructor(private router:Router,private chatService:ChatService,private userService:UserService) {
    
   }

  ngOnInit() {
    this.fetchForums();
  }
  fetchForums(){
    //TODO: get user's forum list
    console.log("fetch forums");
    this.userService.getUsereByUsername(JSON.parse(sessionStorage.getItem('currentUser')))
    .subscribe((data:User)=>{
      this.forums=data.forums;
      console.log(this.forums);
      console.log('Data request....');
    });
  }

  //open specific forum
  openForum(){
    this.router.navigate(['/forum']);
  }

}
