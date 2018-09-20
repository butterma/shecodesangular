import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AlertService} from '../services/alert.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm:FormGroup;

  constructor(private fb:FormBuilder,private alertService:AlertService) {
    this.contactForm=this.fb.group({
      name:'',
      email:'',
      message:''
    });
   }

  ngOnInit() {
  }

  sendContact(name,email,message){
    this.contactForm.get('name').setValue("");
    this.contactForm.get('email').setValue("");
    this.contactForm.get('message').setValue("");
    this.alertService.success('Thanks for your message, keep in touch :)');
  }

}
