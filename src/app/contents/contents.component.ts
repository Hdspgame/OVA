import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { toHTML, Validators } from 'ngx-editor';
import { EditorComponent } from '../editor/editor.component';
import { TaskserviceService } from '../taskservice.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent {

  descData:any;
  descDivVisible:boolean= false;
  descEditorVisible:boolean=true;
  @ViewChild(EditorComponent) child!:EditorComponent ;
  descForm!:FormGroup;

  constructor(private service:TaskserviceService){
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
}
