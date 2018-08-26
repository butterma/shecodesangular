import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

const MINUTES_UNTIL_AUTO_LOGOUT=15
const CHEKC_INTERVAL=1000
const STORE_KEY='lastAction'

@Injectable({
  providedIn: 'root'
})


export class AutoLogoutService {

  get lastAction(){
    return parseInt(sessionStorage.getItem(STORE_KEY));
  }
  set lastAction(value:any){
    sessionStorage.setItem(STORE_KEY,value);
  }
  constructor(private authService:AuthService) {
    console.log("autologoutservice ctor");
    this.check();
    this.initListener();
    this.initInterval();
  }
  initListener(){
    document.body.addEventListener('click',()=>this.reset());
  }
  reset(){
    this.lastAction=Date.now();
  }

  initInterval(){
    setInterval(()=>{
      this.check();
    }, CHEKC_INTERVAL);
  }
  check(){
    const now=Date.now();
    const timelife=this.lastAction+MINUTES_UNTIL_AUTO_LOGOUT*60*1000;
    const diff=timelife-now;
    const isTimeout=diff<0;

    if(isTimeout&&this.authService.loggedIn()){
      this.authService.logout();
    }
  }
}
