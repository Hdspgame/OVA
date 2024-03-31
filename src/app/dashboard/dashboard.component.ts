
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DeleteUserRequest } from '../beans/DeleteRequest';
import { project } from '../beans/project';
import { Task } from '../beans/Task';
import { User } from '../beans/User';
import { UrlConstast } from '../constant/UrlConstant';
import { CreateUserComponent } from '../create-user/create-user.component';
import { CusError } from '../login/Error';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  private response: any;
  public userlist :User[] =[];
  private admin:string ='Admin';
  private user:string ='User';
  private error!:CusError;
  private responseObj:any;
  public isAdminRole:boolean=false;
  public isUserRole:boolean=false;
  isDialogbox : boolean = false;
  errorMessage:String='There is an exception';
  urlbase='';
  taskBaseUrl = UrlConstast.TaskServiceBase;
  userBaseurl=UrlConstast.UserServiceBase;
  private urlAdmin=this.userBaseurl+'/v1/usermanagement/users';
  private urlUserTask=this.taskBaseUrl+'/task?userId=';
  private urlGetProject=this.taskBaseUrl+'/projects';
  taskList: Task[]=[];
  projectList: project[]=[];
  dialog: any;
  selectProject!:project;
  createUser: boolean=false;
  openDialog: boolean=false;
  userObj: User;
// userObj: any;
  // http://localhost:8001/v1/usermanagement/users


  constructor(private fb: FormBuilder,private http: HttpClient,private router :Router,private userService:UserService) { }

  ngOnInit(): void {
    this.getProject();
    this.setRole();
  }
  getProject() {
    let HTTPOptions:Object = {

      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      responseType: 'text'
   }
    this.http.get<any>(this.urlGetProject,HTTPOptions).subscribe(data=>{
      console.log("data",data);
      this.projectList=<project[]> JSON.parse(data);
      console.log(this.taskList)
    },
    (error)=>{
      console.log(error);
      // this.error=error.error;
      if(error.status==0){
    const jsonObject = JSON.parse(error.error);
      this.errorMessage=jsonObject.message;
      console.log(jsonObject)
      
    }
    });
  }
setRole() :void{
  debugger
  let userType=sessionStorage.getItem("userType");
  if(userType==this.admin){
    this.isAdminRole=true;
    this.urlbase=this.urlAdmin;
    this.callForAdmin();
  }else if(userType==this.user){
    this.isUserRole=true;
    let temp=sessionStorage.getItem("user");
    let user=JSON.parse(temp || '{}');
    this.urlbase=this.urlUserTask+user.userId;
    this.callForUser();
  } 
}
  callForUser() {
    let HTTPOptions:Object = {

      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      responseType: 'text'
   }
    this.http.get<any>(this.urlbase,HTTPOptions).subscribe(data=>{
      console.log("data",data);
      this.taskList=<Task[]> JSON.parse(data);
      console.log(this.taskList);
      for(let task of this.taskList){
      for(let project of this.projectList){
        if(task.projectId==project.projectId){
          console.log(task,project)
          task.project=project;
        }
      }
    }
    },
    (error)=>{
      console.log(error);
      // this.error=error.error;
      if(error.status==0){
    const jsonObject = JSON.parse(error.error);
      this.errorMessage=jsonObject.message;
      console.log(jsonObject)
    }
    });
    console.log(this.taskList);
    
  }

callForAdmin() {
  let HTTPOptions:Object = {

    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    responseType: 'text'
 }
  this.http.get<any>(this.urlbase,HTTPOptions).subscribe(data=>{
    console.log("data",data);
    this.userlist=<User[]> JSON.parse(data);
    console.log(this.userlist)
  },
  (error)=>{
    console.log(error);
    // this.error=error.error;
    if(error.status==0){
  const jsonObject = JSON.parse(error.error);
    this.errorMessage=jsonObject.message;
    console.log(jsonObject)
  }
  });
}

eventHandle($event :string){
  debugger;
  // this.isDialogbox = false;
  console.log("in parent");
  let role=$event;
  if(role.toLowerCase()=="admin"){
    // this.isDialogbox = true;
    // this.dialog.open(CreateUserComponent, {
    //   data: action
    // });
  }
}

deleteUser(user:User) {
  let d:DeleteUserRequest={
    userName: '',
    lastUpdateBy: ''
  };
  d.userName=user.userName
    d.lastUpdateBy=user.lastUpdateBy
    console.log(this.userService.deleteUser(d).subscribe(s=>{
      console.log(s)
    },(e:HttpErrorResponse)=>console.log(e)))
  }
  unlockUser(user:User) {
    this.userService.unlockUser(user.userName).subscribe(response=>{
      // this.p="Successfully unlocked the user"
   },(e:HttpErrorResponse)=>{})
  }
  editUser(user:User) {
    this.userObj=user;
  this.openDialog=true;
  this.createUser=false;
  }

  closeDialogue(event:any){
    console.log(event);
    
    // this.isDialogbox = false;
    this.createUser=false;
    this.openDialog=false;
    // this.isDialogbox=false;
  }
}

