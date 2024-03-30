import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { project } from '../beans/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  getProjectsUrl="http://3.111.147.190:8081/projects"
  saveProjectUrl="http://3.111.147.190:8081/project"
  constructor(private h:HttpClient) { }

  public getProjects():Observable<project[]>{
    return this.h.get<project[]>(`${this.getProjectsUrl}`)
  }

  public saveProject(proj:project):Observable<project>{
    return this.h.post<project>(`${this.saveProjectUrl}`,proj)
  }
}
