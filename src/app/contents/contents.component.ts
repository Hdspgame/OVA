import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { toHTML, Validators } from 'ngx-editor';
import { project } from '../beans/project';
import { Task } from '../beans/Task';
import { User } from '../beans/User';
import { EditorComponent } from '../editor/editor.component';
import { TaskserviceService } from '../services/taskservice.service';


@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent {
  @Input() taskId:string="";
  descData:any;
  user!:User
  descDivVisible:boolean= false;
  descEditorVisible:boolean=true;
  @ViewChild(EditorComponent) child!:EditorComponent ;
  descForm!:FormGroup;
  task!:Task;
  project!:project;

  constructor(private service:TaskserviceService){
   
  }
  ngOnInit(): void {
    console.log("taskid ",this.taskId);
    this.getTask();
    this.descForm = new FormGroup({
      editorContent: new FormControl(this.descData, Validators.required())
    });
  }
  getDataForDescription(){
    // alert("yo");
    this.descData=this.child.onSubmit();
    console.log("my data "+this.descData);
    this.descData=toHTML(this.descData);
    this.service.descriptionSubject.next(this.descData);
    console.log("my data "+this.descData);
    this.descDivVisible=true;
    this.descEditorVisible=false;
    console.log(this.taskId);
    // this.child.getdata();
  }

  editDescription(){

    this.descForm = new FormGroup({
      editorContent: new FormControl(this.descData, Validators.required())
    });
  // debugger;
  //   console.log("hetre");
    // this.child.htmlContent=this.descData;
    // this.service.descriptionSubject.next(this.descData);
    this.descDivVisible=false;
    this.descEditorVisible=true;
    // this.child.instance.inserText(this.descData);
    // this.child.htmlContent=this.descData;
    // this.child.getData();
  }
  getTask(){
    let data=sessionStorage.getItem('user');
    this.user=JSON.parse(data ||'{}');
    console.log(this.user)
    // userId:string=this.user.userId;
    this.service.getTasks(JSON.stringify(this.user.userId),this.taskId).subscribe(res =>{
      this.task=res[0];
      console.log("task",this.task);
      this.descData=this.task.taskDescription;
    });
  }
}
