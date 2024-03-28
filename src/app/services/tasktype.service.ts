import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskType } from '../beans/TaskType';

@Injectable({
  providedIn: 'root'
})
export class TasktypeService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/tasktypes';

  getAllTaskTypes():Observable<TaskType[]> {
    return this.http.get<TaskType[]>(`${this.baseUrl}`);
  }
}
