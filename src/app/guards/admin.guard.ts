import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(JSON.parse(sessionStorage.getItem('currentUser')).role);
    if(JSON.parse(sessionStorage.getItem('currentUser')).role=='Admin')
      return true;
    this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
    return false;
  }
}
