import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../beans/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  public descriptionSubject = new Subject<String>();
  public commentSubject = new Subject<String>();

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'http://localhost:8080/task';

  getAllTasks(userId: any, taskId: any): Observable<Task[]> {
    if (userId == null)
      userId = '';
    if (taskId == null)
      taskId = '';
    return this.httpClient.get<Task[]>(`${this.baseUrl}` + "?userId=" + userId + "&taskId=" + taskId);
  }

  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.baseUrl}`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.baseUrl}`, task);
  }

  searchTasks(key: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.baseUrl}` + "/search?key=" + key);
  }

}
