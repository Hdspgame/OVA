
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/Task';
import { CusError } from '../login/Error';
import { Project } from '../Project';
import { User } from './User';

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
  errorMessage:String='There is an exception';
  urlbase='';
  private urlAdmin='http://172.20.10.2:8001/v1/usermanagement/users';
  private urlUserTask='http://172.20.10.4:8080/task?userId=';
  private urlGetProject='http://172.20.10.4:8080/projects';
  taskList: Task[]=[];
  projectList: Project[]=[];
// userObj: any;
  // http://localhost:8001/v1/usermanagement/users


  constructor(private fb: FormBuilder,private http: HttpClient,private router :Router) { }

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
      this.projectList=<Project[]> JSON.parse(data);
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
        if(task.projectId=project.projectId){
          task.project=project
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
}

