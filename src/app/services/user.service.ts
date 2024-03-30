import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteUserRequest } from '../beans/DeleteRequest';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  unlockUserUrl= "http://localhost:8001/v1/usermanagement";
  deleteUserUrl= "http://localhost:8001/v1/usermanagement/users";
  constructor(private h:HttpClient) { 
    
  }

  public unlockUser(username:string):Observable<HttpResponse<any>>{
    const param = new HttpParams().set("username",username)
   return this.h.post<HttpResponse<any>>(`${this.unlockUserUrl}`,param,{observe: 'response'})
  }

  public deleteUser(usr:DeleteUserRequest):Observable<any>{
    const options = {
      body: {
        userName: usr.userName,
        lastUpdateBy :usr.lastUpdateBy
      }
    }
   return this.h.delete<any>(`${this.deleteUserUrl}`, options)
  }
}
