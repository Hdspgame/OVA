import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';


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
  @Output() closeDialogEmiter:EventEmitter<any> = new EventEmitter();
  ngOnInit(){
    console.log("hdspgame",this.xys);
  
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
