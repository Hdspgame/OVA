import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toHTML ,Validators as validEditor} from 'ngx-editor';
import { project } from '../beans/project';
import { Task } from '../beans/Task';
import { TaskReq } from '../beans/TaskReq';
import { User } from '../beans/User';
import { EditorComponent } from '../editor/editor.component';
import { ProjectService } from '../services/project.service';
import { TaskserviceService } from '../services/taskservice.service';
import { UserService } from '../services/user.service';



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
editEnable: boolean=false;
  createTaskForm!: FormGroup;
  public projects:project[]=[];

  constructor(private service:TaskserviceService,private projectService:ProjectService,private fb:FormBuilder,private router: Router,private userService:UserService){
    // this.getTask();
  }
  ngOnInit(): void {
    console.log("taskid ",this.taskId);
    this.editEnable=false;
    this.getTask();
    this.projectService.getProjects().subscribe(resposne => {
      console.log(resposne);
      this.projects=resposne;
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
      editorContent: new FormControl(this.descData, validEditor.required())
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
  async getTask(){
    let data=sessionStorage.getItem('user');
    this.user=JSON.parse(data ||'{}');
    console.log(this.user)
    // userId:string=this.user.userId;
    await this.service.getTasks(JSON.stringify(this.user.userId),this.taskId).subscribe(res =>{
      this.task=res[0];
      console.log("task",this.task);
      this.projectService.getProject(this.task.projectId).subscribe(res=>{
        this.task.project=res;
      })
      this.descData=this.task.taskDescription;
    });
    // this.user=this.userService.

  }
  editTask(){
    console.log("edit");
    if(this.editEnable){
        console.log();
        let task:Task=this.task;
        if(this.createTaskForm.valid){
        task.taskId=this.task.taskId;
        task.projectId=this.createTaskForm.controls['selectProject'].value;
        task.taskTitle=this.createTaskForm.controls['taskTitle'].value;
        task.taskDescription='';
        task.userId=this.createTaskForm.controls['assignedTo'].value;
        task.taskType=this.createTaskForm.controls['taskType'].value;
        let temp=sessionStorage.getItem("user");
        let user=JSON.parse(temp || '{}');
        // task.userId=user.userId;
        task.createdBy=user.userId;
        task.lastUpdatedBy=user.userId;
        console.log(task);
        this.service.updateTask(task).subscribe(res=>{
          console.log(res);
        });
        }
        const currentRoute = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
      }); 
      const newLocal = this;
      newLocal.editEnable=false;
    }else{
      this.createTaskForm=this.fb.group({
        taskTitle: new FormControl(this.task.taskTitle,[
          Validators.required,
          ]
         ),
         assignedTo: new FormControl(this.task.userId, [
          Validators.required,
          ]
         ),
         selectProject: new FormControl(this.task.project.projectName, [
          Validators.required,
          ]
         ),
         taskType: new FormControl(this.task.taskType, [
          Validators.required,
          ]
         )
      });
      this.descForm = new FormGroup({
        editorContent: new FormControl(this.descData, validEditor.required())
      });
      this.editEnable=true;
    }
    console.log(this.createTaskForm);
    
  }
}
