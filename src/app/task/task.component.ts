import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskserviceService } from '../services/taskservice.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  private routeSub!: Subscription;
  tasksId:string='';
constructor(private route: ActivatedRoute,private taskService:TaskserviceService) { 
  console.log('in task');
  this.routeSub = this.route.params.subscribe(params => {
    this.tasksId=params['id'];
    console.log("task id ",this.tasksId);
  });
}
  ngOnInit(): void {
   console.log("here");
   this.routeSub = this.route.params.subscribe(params => {
    console.log(params) //log the entire params object
    console.log(params['id']) //log the value of id
    this.tasksId=params['id'];
    console.log(this.tasksId);
  });
  }
}
