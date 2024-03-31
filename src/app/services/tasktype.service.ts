import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskType } from '../beans/TaskType';
import { UrlConstast } from '../constant/UrlConstant';

@Injectable({
  providedIn: 'root'
})
export class TasktypeService {

  constructor(private http: HttpClient) { }

  private baseUrl = UrlConstast.TaskServiceBase+'/tasktypes';

  getAllTaskTypes():Observable<TaskType[]> {
    return this.http.get<TaskType[]>(`${this.baseUrl}`);
  }
}
