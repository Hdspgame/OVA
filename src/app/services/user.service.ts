import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteUserRequest } from '../beans/DeleteRequest';
import { UrlConstast } from '../constant/UrlConstant';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userBaseurl=UrlConstast.UserServiceBase;
  unlockUserUrl= this.userBaseurl+"/v1/usermanagement";
  deleteUserUrl= this.userBaseurl+"/v1/usermanagement/users";
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
