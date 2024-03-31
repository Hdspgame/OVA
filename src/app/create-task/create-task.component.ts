import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { project } from '../beans/project';
import { TaskReq } from '../beans/TaskReq';
import { ProjectService } from '../services/project.service';
import { TaskserviceService } from '../services/taskservice.service';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit{
  @Input() xys : boolean = false;
  public name='';
  public email='';
  public password='';
  public list=[];
  public projects:project[]=[];
  @Output() closeDialogEmiter:EventEmitter<any> = new EventEmitter();
  createTaskForm!: FormGroup<any>;
selectProject!: project;
  constructor(private projectService:ProjectService,private fb:FormBuilder,private taskService:TaskserviceService){
  }
  ngOnInit(){ 
    console.log("hdspgame",this.xys);
  this.projectService.getProjects().subscribe(resposne => {
    console.log(resposne);
    this.projects=resposne;
    this.createTaskForm=this.fb.group({
      taskName: new FormControl('', [
        Validators.required,
        ]
       ),
       assignedTo: new FormControl('', [
        Validators.required,
        ]
       ),
       selectProject: new FormControl('', [
        Validators.required,
        ]
       ),
       taskType: new FormControl('', [
        Validators.required,
        ]
       ),
       priority: new FormControl('', [
        Validators.required,
        ]
       ),
    });
  });
    // this.xys=true;
  }
  dialogRef: any;
  closeDialog(){
    this.xys = false;
    this.closeDialogEmiter.emit(true);
  }
   onSubmit(){
    console.log(this.createTaskForm);
    let task:TaskReq={
      projectId: 0,
      userId: 0,
      taskType: '',
      taskTitle:'',
      taskDescription: '',
      taskStatus: '',
      createdBy:'',
      lastUpdatedBy:''
    };
    if(this.createTaskForm.valid){
    task.projectId=this.createTaskForm.controls['selectProject'].value;
    task.taskTitle=this.createTaskForm.controls['taskName'].value;
    task.taskDescription='';
    task.taskType=this.createTaskForm.controls['taskType'].value;
    let temp=sessionStorage.getItem("user");
    let user=JSON.parse(temp || '{}');
    task.userId=user.userId;
    task.createdBy=user.userId;
    task.lastUpdatedBy=user.userId;
    console.log(task);
    this.taskService.addTask(task).subscribe(res=>{
      console.log(res);
    });
    }
    this.closeDialog();
  }
}
