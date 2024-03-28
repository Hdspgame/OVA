import { Component, EventEmitter, Input, Output } from '@angular/core';

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


  ngOnInit(): void {
    if(this.adminView && !this.userView){
      this.CompOne=this.adminRole;
    }else{
      this.CompOne=this.userRole;
    }
  }

  updateRole():void{
    if(this.adminView){
      this.CompOne=this.adminRole;
    }else{
      this.CompOne=this.userRole;
    }
  }
  onSubmit():void{
    this.updateRole();
    console.log(this.CompOne);
    if(this.adminRole){
      this.createUser=true;
      this.emitter.emit("admin");
    }else{
      this.createTask=true;
      this.emitter.emit("user");
    }
    
  }
}
