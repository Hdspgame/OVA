import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeValue } from '@angular/platform-browser';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Editor, toDoc, toHTML, Validators } from 'ngx-editor';
import { TaskserviceService } from '../taskservice.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export  class EditorComponent implements OnInit {
  @Input() showEditor:boolean = true;
  myContent:any;
  @Input()form!:  FormGroup;
  a!: any;
  public htmlContent ='';
  editor!: Editor;
  renderedHtmlContent: any = "";

  constructor(private sanitizer: DomSanitizer,private service:TaskserviceService,private changeDetectionRef: ChangeDetectorRef) {
    // this.service.descriptionSubject.subscribe(val=>{
    //   // console.log("here in edit onit "+val);
    //  this.htmlContent=val;
    //  console.log(this.htmlContent);
    // });
    // this.getValue();
  }
 

  // form = new FormGroup({
  //   editorContent: new FormControl(this.html, Validators.required())
  // });

  ngOnInit(): void {
    this.editor = new Editor();
    if(this.form.valid){
      this.htmlContent= this.form.controls['editorContent'].value
    }
  //  this.htmlContent= this.form.controls['editorContent'].value
  }
  // make sure to destory the editor
  // ngOnDestroy(): void {
  //   this.editor.destroy();
  // }

  getValue(){
    this.service.descriptionSubject.subscribe((value:any)=>{
      console.log(value,"value");
      this.htmlContent=value;
      // this.form.patchValue({
      //   editorContent:this.htmlContent
      // });
      // this.changeDetectionRef.detectChanges();
      console.log(this.htmlContent,"ngModel");
      console.log(this.form.value,"formm");
    })
  }
  onSubmit() :any{
    // this.html= this.form.controls['editorContent']
    // console.log("Your form data : ", this.form.value);
    console.log("KO SANITIZATION : ", this.form.controls['editorContent'].value);
    let data = toDoc(this.htmlContent);
    console.log(data,"data");
    this.renderedHtmlContent = this.sanitizeHtmlContent(this.form.get('editorContent')?.value);
    // this.a= document.getElementById("divD");
    // this.myContent=this.htmlContent;
    // this.renderedHtmlContent=a;
    // this.renderedHtmlContent = this.sanitizeHtmlContent(
    //   this.form.controls["editorContent"].value
    // );\
    return data;
  }
  public sanitizeHtmlContent(htmlstring: any ){
    return this.sanitizer.sanitize(SecurityContext.HTML, htmlstring);
  }

  getData():void{
    // console.log("here in get data");
    // this.service.descriptionSubject.subscribe(val=>{console.log("here "+val)});
  }
}