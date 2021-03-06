import { Component } from '@angular/core';
import {MyAuthService} from './services/my-auth.service';
import {Router} from '@angular/router';
import{first} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService:MyAuthService,private router:Router){}

  onLogoutClick(){
    console.log("in logout click function");
    this.authService.logout().pipe(first()).subscribe(data=>{
      this.router.navigate(['/login']);
    });
    console.log("end logout click function");
  }
}
