import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component,  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CusError } from './Error';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm! : FormGroup;
  public inValidUser: boolean = false;
  public inValidPass: boolean = false;
  public validInput:boolean =false;
  private response: any;
  private error!:CusError;
  private responseObj:any;
  public errorResponse=false;
  errorMessage:String='There is an exception';
  urlbase='';
  responseCode!:HttpStatusCode;
  private url='http://172.20.10.2:8001/v1/usermanagement';
  constructor(private fb: FormBuilder,private http: HttpClient,private router :Router) { }

  ngOnInit(): void {
    sessionStorage.setItem("userLogged","false");
    this.loginForm = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        ]
       ),
      password: new FormControl('', [
        Validators.required,
        ]
       ),
    });

  }

  onSubmit() {
    this.errorResponse=false;
    this.urlbase='';
    // TODO: Submit the form to your backend API
    console.log(this.loginForm.controls);
    if(this.loginForm.controls['username'].status=='INVALID'){
      this.inValidUser = true;
      console.log(this.inValidUser);
    }else{
      this.inValidUser = false;
    }
  // debugger;
    if(this.loginForm.controls['password'].status=='INVALID'){
      this.inValidPass = true;
      console.log(this.inValidPass);
    }
    else{
      this.inValidPass = false;
    }
    if(!this.inValidPass && !this.inValidUser)
    {
      this.validInput=true
      let userName=this.loginForm.controls['username'].value;
      let passWord=this.loginForm.controls['password'].value;
      this.urlbase=this.url+'?username='+userName+'&password='+passWord;
      console.log(this.url);
      let HTTPOptions:Object = {

        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        responseType: 'text'
     }
      this.http.post<any>(this.urlbase,null,HTTPOptions).subscribe(data=>{
        console.log("data",data);
        this.responseObj=data;
        console.log(this.responseObj);
        const jsonObject = JSON.parse(data);
        sessionStorage.setItem("userLogged","true");
        const userobj= jsonObject.userResponse;
        console.log("user",userobj);
        sessionStorage.setItem("user",JSON.stringify(userobj));
        sessionStorage.setItem("userType",userobj.userRole)
        this.router.navigate(['/dashboard']);
      },
      (error)=>{
        console.log(error);
        // this.error=error.error;
        if(error.status==0){
      const jsonObject = JSON.parse(error.error);
        this.errorMessage=jsonObject.message;
        console.log(jsonObject)
        
      }
        this.errorResponse=true;
      });
        console.log("response" ,this.response);
        console.log("response" ,this.responseCode);

    }else{
      this.validInput=false;
    }

  }

}
