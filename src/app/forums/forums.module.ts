import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material.module';
import { ForumsComponent } from './forums.component';
import { ForumComponent } from './components/forum/forum.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AngularFileUploaderModule } from "angular-file-uploader";
import * as SocketIOFileUpload from "socketio-file-upload";
import { BrowserModule } from '@angular/platform-browser';
import { FileValueAccessor } from './file-value-accessor.directive';

@NgModule({
  imports: [
    AngularFileUploaderModule,
    //SocketIOFileUpload,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ForumsComponent, ForumComponent]
})
export class ForumsModule {

 
 }
