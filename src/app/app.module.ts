import { NgModule } from '@angular/core';
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
import { TaskserviceService } from './taskservice.service';
import { HttpClientModule } from '@angular/common/http';



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
