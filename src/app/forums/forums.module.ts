import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material.module';
import { ForumsComponent } from './forums.component';
import { ForumComponent } from './components/forum/forum.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AngularFileUploaderModule } from "angular-file-uploader";

@NgModule({
  imports: [
    AngularFileUploaderModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ForumsComponent, ForumComponent]
})
export class ForumsModule {

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.pdf,.docx,.txt,.gif,.jpeg",
    maxSize: "1",
    uploadAPI:  {
      url:"https://example-file-upload-api",
      headers: {
     "Content-Type" : "text/plain;charset=UTF-8"
      }
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true
  };
 }
