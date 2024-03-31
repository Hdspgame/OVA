import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { project } from '../beans/project';
import { UrlConstast } from '../constant/UrlConstant';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  getProjectsUrl=UrlConstast.TaskServiceBase+"/projects";
  getProjectUrl=UrlConstast.TaskServiceBase+"/project";
  saveProjectUrl=UrlConstast.TaskServiceBase+"/project";
  constructor(private h:HttpClient) { }

  public getProjects():Observable<project[]>{
    return this.h.get<project[]>(`${this.getProjectsUrl}`)
  }

  public saveProject(proj:project):Observable<project>{
    return this.h.post<project>(`${this.saveProjectUrl}`,proj)
  }
  public getProject(projectId:number):Observable<project>{
    return this.h.get<project>(`${this.getProjectUrl}/${projectId}`)
  }
  public updateProject(proj: project, pid: any): Observable<project> {
    return this.h.put<project>(`${this.saveProjectUrl}` + "/" + pid, proj)
  }
}
