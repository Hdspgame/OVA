import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { project } from './beans/project';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  getProjectsUrl="http://localhost:8000/projects"
  saveProjectUrl="http://localhost:8000/project"
  constructor(private h:HttpClient) { }

  public getProjects():Observable<project[]>{
    return this.h.get<project[]>(`${this.getProjectsUrl}`)
  }

  public saveProject(proj:project):Observable<project>{
    return this.h.post<project>(`${this.saveProjectUrl}`,proj)
  }
}
