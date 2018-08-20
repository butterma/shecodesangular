import { Component, OnInit, ElementRef,Input,OnDestroy } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ModalService} from '../services/modal.service';
import{UserService} from '../services/user.service';
import { Router,ActivatedRoute } from '../../../node_modules/@angular/router';
@Component({
  selector:'app-edit-modal',
  //templateUrl: './edit-modal.component.html',
  template:
  ` <ng-content></ng-content>`,    
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit,OnDestroy {
  @Input() id:string;
  private element:any;
  updateForm:FormGroup;
  user:any={};

  constructor(private modalService:ModalService,private userService:UserService, private el:ElementRef,private fb:FormBuilder,private router:Router,private route:ActivatedRoute) {
    this.element=el.nativeElement;
    this.updateForm=this.fb.group({
      username:['',Validators.required],
      password:''
    });
   }

  ngOnInit():void {
    let modal=this;

    if(!this.id){
      console.error('modal must have an id');
      //return;
    }
    document.body.appendChild(this.element);

    this.element.addEventListener('click',function(e:any){
      if(e.target.className==='edit-modal'){
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
  open(id):void{
    console.log("id: "+id);
    this.route.params.subscribe(params=>{
      this.id=id;
      this.userService.getUserById(id).subscribe(res=>{
        this.user=res;
        this.updateForm.get('username').setValue(this.user.username);
        this.updateForm.get('password').setValue(this.user.password);
        this.updateForm.get('branch').setValue(this.user.branch);
      });
    });
    console.log("open edit-modal");
    this.element.style.display='block';
    document.body.classList.add('app-edit-modal');
  }

  close():void{
    this.element.style.display='none';
    document.body.classList.remove('edit-modal');
  }

}
