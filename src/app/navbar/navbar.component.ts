import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  @Input() adminView:boolean=false;
  private userView: boolean=true;
  public CompOne='Create Task';
  private adminRole='Create User';
  private userRole='Create Task';
 public createUser:boolean=false;
  public createTask:boolean=false;
  @Output() emitter= new EventEmitter<string>();
  openDialog: boolean=false;
  private admin:string ='Admin';
  private user:string ='User';
  descForm!:FormGroup;


  ngOnInit(): void {
    debugger
    let userType=sessionStorage.getItem("userType");
    if(userType==this.admin){
      this.adminView=true;
      this.userView=false;
    }else if(userType==this.user){
      this.userView=true;
      this.adminView=false;
    } 
    this.descForm = new FormGroup({
      editorContent: new FormControl( )
    });
  }

  updateRole():void{
    let userType=sessionStorage.getItem("userType");
    if(userType==this.admin){
      this.adminView=true;
      this.userView=false;
    }else if(userType==this.user){
      this.userView=true;
      this.adminView=false;
    } 
  }
  onSubmit():void{
    this.updateRole();
    this.openDialog=true;
    console.log(this.CompOne);
    if(this.adminRole){
      this.createUser=true;
      this.createTask=false;
      // this.emitter.emit("admin");
    }else{
      this.createUser=false;
      this.createTask=true;
      // this.emitter.emit("user");
    }
    console.log(this.createTask," ",this.createUser);
    
  }
  closeDialogue(event:any){
    console.log(event);
    
    // this.isDialogbox = false;
    this.createUser=false;
    this.openDialog=false;
    this.createTask=false;
    // this.isDialogbox=false;
  }
}
