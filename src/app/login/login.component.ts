import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component,  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  responseCode!:HttpStatusCode;
  private url='http://localhost:8080/v1/usermanagement';
  constructor(private fb: FormBuilder,private http: HttpClient) { }

  ngOnInit(): void {
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
      this.url=this.url+'?username='+userName+'&password='+passWord;
      console.log(this.url);
      let HTTPOptions:Object = {

        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        responseType: 'text'
     }
      this.http.post<HttpResponse<any>>(this.url,null,HTTPOptions).subscribe(data=>{
        console.log("data",data);
        
        this.response=data.body,
        this.responseCode=data.status
      });
        console.log("response" ,this.response);
        console.log("response" ,this.responseCode);

    }else{
      this.validInput=false;
    }

  }

}
