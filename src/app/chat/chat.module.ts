import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import {MaterialModule} from '../material.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ChatComponent]
})
export class ChatModule { }
