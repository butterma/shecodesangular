import { Component, OnInit, ElementRef,Input,OnDestroy } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ModalService} from '../services/modal.service';
import{UserService} from '../services/user.service';
import { Router,ActivatedRoute } from '../../../node_modules/@angular/router';
@Component({
  selector:'app-edit-modal',
  //templateUrl: './edit-modal.component.html',
  template: ` <ng-content></ng-content>`,    
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit,OnDestroy {
  @Input() id:string;
  private element:any;
  updateForm:FormGroup;
  user:any={};

  constructor(private modalService:ModalService,private userService:UserService, private el:ElementRef,private fb:FormBuilder,private router:Router,private route:ActivatedRoute) {
    this.element=el.nativeElement;
      }

  ngOnInit():void {
    let modal=this;

    if(!this.id){
      console.error('modal must have an id');
      //return;
    }
    document.body.appendChild(this.element);

    this.element.addEventListener('click',function(e:any){
      if(e.target.className==='modal'){
        modal.close();
      }
    });
    console.log("add modal to modal service");
    this.modalService.add(this);   
  }

  ngOnDestroy():void{
    this.modalService.remove(this.id);
    this.element.remove();
  }
  open():void{
    console.log("open edit-modal");
    this.element.style.display='block';
    document.body.classList.add('modal-open');
  }

  close():void{
    this.element.style.display='none';
    document.body.classList.remove('modal-open');
  }

}
