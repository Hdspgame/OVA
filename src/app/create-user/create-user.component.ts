import { Component, EventEmitter, Input, OnInit, Output ,inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../beans/User';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{
  @Input() createUser : boolean = false;
  public name='';
  public email='';
  public password='';
  public list : string[]=['Admin','User'];
  public createUserForm! : FormGroup;
  public updateUserForm! : FormGroup;
  public editUser:boolean=false;
  adminUser:boolean=false;
  @Input() obj:User;
  // @Input() userForm!:FormGroup;
  @Output() closeDialogEmiter:EventEmitter<any> = new EventEmitter();
  task=inject(UserService)
usernameDisabled: boolean=true;
  constructor(private user: FormBuilder,private update: FormBuilder,userservice:UserService) { }
  ngOnInit(): void {
    this.getUser()
    console.log(this.adminUser,"adminuser");
    let userType=sessionStorage.getItem("userType");
    if(!this.createUser){
      this.editUser=true;
      this.adminUser=false;
    }else if(userType=="Admin"){
      this.adminUser=true;
    }else{
      this.adminUser=false;
    } 
    this.createUserForm=this.user.group({
      nm: new FormControl('', [
        Validators.required,
        ]
       ),
       email: new FormControl('', [
        Validators.required,
        ]
       ),
       password: new FormControl('', [
        Validators.required,
        ]
       ),
       username: new FormControl('', [
        Validators.required,
        ]
       ),
       designation: new FormControl('', [
        Validators.required,
        ]
       ),
       userrole: new FormControl('', [
        Validators.required,
        ]
       ),
       phone: new FormControl('', [
        Validators.required,
        ]
       )
    });
console.log(this.obj)
    this.updateUserForm=this.update.group({
      nm: new FormControl(this.obj.name, [
        Validators.required,
        ]
       ),
       email: new FormControl(this.obj.email, [
        Validators.required,
        ]
       ),
       designation: new FormControl(this.obj.designation, [
        Validators.required,
        ]
       ),
       username: new FormControl({value: this.obj.userName, disabled:true}, [
        Validators.required
        ]
       ),
       phone: new FormControl(this.obj.phone, [
        Validators.required,
        ]
       )
    });
  }
;

  msg=''

  usrRequest:User={
    userId:0,
    name:'',
    userName:'',
    password:'',
    userRole:'',
    email:'',
    designation:'',
    createdBy:'',
    lastUpdateBy:'',
    phone:0,
    failedLogincount:0,
    active:true,
    locked:false
  }

  usrResponse:User={
    userId:0,
    name:'',
    userName:'',
    password:'',
    userRole:'',
    email:'',
    designation:'',
    createdBy:'',
    lastUpdateBy:'',
    phone:0,
    failedLogincount:0,
    active:true,
    locked:false
  }

  onSubmit(){
    console.log(this.adminUser);
    this.usrRequest.name = this.createUserForm.value.nm
    this.usrRequest.email = this.createUserForm.value.email
    this.usrRequest.designation = this.createUserForm.value.designation
    this.usrRequest.userName = this.createUserForm.value.username
    this.usrRequest.password = this.createUserForm.value.password
    this.usrRequest.userRole= this.createUserForm.value.userrole
    this.usrRequest.phone = this.createUserForm.value.phone
    this.task.saveUser(this.usrRequest).subscribe((response)=>{
      this.msg= "User successfully added with username: "+response.userName
    },(e:HttpErrorResponse)=>{
      console.log("Exception: "+e.error)
    })
  }
  closeDialog(){
    this.adminUser = false;
    this.closeDialogEmiter.emit(false);
  }
  
  updateMsg=''

  updateUser(){
    this.usrRequest.name = this.updateUserForm.value.nm
    this.usrRequest.email = this.updateUserForm.value.email
    this.usrRequest.designation = this.updateUserForm.value.designation
    this.usrRequest.userName = this.updateUserForm.value.username
    this.usrRequest.phone = this.updateUserForm.value.phone
    this.task.updateUser(this.usrRequest).subscribe((response)=>{
      this.msg= "User successfully updated with username: "+response.userName
    },(e:HttpErrorResponse)=>{
      console.log("Exception: "+e.error)
    })
  }

  getUser(){
    this.task.getUser("Test1").subscribe((response)=>{
      console.log("response: "+response[0].name)
    })
  }
 
}
