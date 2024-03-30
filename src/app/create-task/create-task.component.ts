import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { project } from '../beans/project';
import { ProjectService } from '../services/project.service';


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
  constructor(private projectService:ProjectService){
  }
  ngOnInit(){ 
    console.log("hdspgame",this.xys);
  this.projectService.getProjects().subscribe(resposne => {
    console.log(resposne);
    this.projects=resposne;
  });
    // this.xys=true;
  }
  dialogRef: any;
  closeDialog(){
    this.xys = false;
    this.closeDialogEmiter.emit(true);
  }
   onSubmit(){
    
  }
}
