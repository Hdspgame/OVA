import { NgModule, Output } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './task/task.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentsComponent } from './contents/contents.component';
import { NgxEditorModule } from 'ngx-editor';
import { CommentsComponent } from './comments/comments.component';
import { EditorComponent } from './editor/editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PiechartComponent } from './piechart/piechart.component';

import { HttpClientModule } from '@angular/common/http';
import { EventEmitter } from 'stream';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ProjectComponent } from './project/project.component';
import { TaskserviceService } from './services/taskservice.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskComponent,
    NavbarComponent,
    ContentsComponent,
    EditorComponent,
    CommentsComponent,
    DashboardComponent,
    PiechartComponent,
    CreateUserComponent,
    CreateTaskComponent,
    ProjectComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    HttpClientModule,
  ],
  providers: [TaskserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
