import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {

  private isTyping=false;
  messageArray:Array<{user:String,message:String}>=[];
  displayedColumns=['name','action'];
  constructor(private router:Router) {
    
   }

  ngOnInit() {
    this.fetchForums();
  }
  fetchForums(){
    //TODO: get user's forum list
  }

  //open specific forum
  openForum(){
    this.router.navigate(['/forum']);
  }

}
