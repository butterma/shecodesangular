import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material.module';
import { ForumsComponent } from './forums.component';
import { ForumComponent } from './components/forum/forum.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ForumsComponent, ForumComponent]
})
export class ForumsModule { }
