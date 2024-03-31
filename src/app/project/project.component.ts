import { Component, OnInit, inject } from '@angular/core';
import { project } from '../beans/project';
import { ProjectService } from '../services/project.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  ngOnInit(): void {
    this.getProjects();
  }

  myForm = new FormGroup({
    pid: new FormControl('', [Validators.required]),
    pname: new FormControl('', [Validators.required]),
    pdesc: new FormControl('', [Validators.required]),
    psrtdate: new FormControl('', [Validators.required]),
    penddate: new FormControl('', [Validators.required])
  });

  get validData() {
    return this.myForm.controls;
  }
  projService = inject(ProjectService);
  constructor(projectService: ProjectService) { }

  projArray: project[] = [{
    projectName: '',
    projectId: 0,
    projectDescription: '',
    projectStartDate: '',
    projectEndDate: '',
    createdBy: '',
    createdDate: '',
    lastUpdatedBy: '',
    lastUpdatedDate: ''
  }]

  getProjects() {
    this.projService.getProjects().subscribe((a: project[]) => {
      this.projArray = a;
    });
  }

  proj: project = {
    projectName: '',
    projectId: null,
    projectDescription: '',
    projectStartDate: '',
    projectEndDate: '',
    createdBy: '',
    createdDate: '',
    lastUpdatedBy: '',
    lastUpdatedDate: ''
  }

  editTask(p: project) {
    this.myForm.controls.pid.setValue(p.projectId.toString());
    this.myForm.controls.pname.setValue(p.projectName);
    this.myForm.controls.pdesc.setValue(p.projectDescription);
    this.myForm.controls.psrtdate.setValue(p.projectStartDate);
    this.myForm.controls.penddate.setValue(p.projectEndDate);
  }

  updateProject() {
    this.proj.projectId = (this.myForm.controls.pid.value) != null ? (this.myForm.controls.pid.value) : '';
    this.proj.projectName = (this.myForm.controls.pname.value) != null ? (this.myForm.controls.pname.value) : '';
    this.proj.projectDescription = (this.myForm.controls.pdesc.value) != null ? (this.myForm.controls.pdesc.value) : '';
    this.proj.projectStartDate = (this.myForm.controls.psrtdate.value) != null ? (this.myForm.controls.psrtdate.value) : '';
    this.proj.projectEndDate = (this.myForm.controls.penddate.value) != null ? (this.myForm.controls.penddate.value) : '';
    let temp=sessionStorage.getItem("user");
    let user=JSON.parse(temp || '{}');
    this.proj.createdBy = user.userName;
    this.proj.lastUpdatedBy = user.userName;
    if (this.proj.projectId) {
      this.projService.updateProject(this.proj, this.proj.projectId).subscribe((res: project) => {
        console.log(res);
        document.getElementById('modalClose')?.click();
        this.getProjects();
      });
    } else {
      this.projService.saveProject(this.proj).subscribe((res: project) => {
        console.log(res);
        document.getElementById('modalClose')?.click();
        this.getProjects();
      });
    }
  }

  newProject() {
    this.myForm.reset();
  }

}
