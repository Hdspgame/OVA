import { Component, OnInit, inject } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { project } from '../beans/project';
import { FormGroup, FormControl,Validators,ReactiveFormsModule,FormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  
  // myForm!:FormGroup;
  constructor(projectService: ProjectService,private fb: FormBuilder,private router: Router) { }
  myForm = new FormGroup({
    pid: new FormControl(''),
    pname: new FormControl('', [Validators.required]),
    pdesc: new FormControl('', [Validators.required]),
    psrtdate: new FormControl('', [Validators.required]),
    penddate: new FormControl('', [Validators.required])
  });
  ngOnInit(): void {
    this.getProjects();
    let userType=sessionStorage.getItem("userType");
    if(userType=="Admin"){
      // this.adminUser=true;
    }else{
      this.router.navigate(['/dashboard']);
      // this.adminUser=false;
  }
}

  

  get validData() {
    return this.myForm.controls;
  }
  projService = inject(ProjectService);

  projArray: project[] = []

  getProjects() {
    this.projService.getProjects().subscribe((a: project[]) => {
      this.projArray = a;
    });
  }

  proj: project =new project;

  editTask(p: project) {
    this.myForm.controls.pid.setValue(p.projectId.toString());
    this.myForm.controls.pname.setValue(p.projectName);
    this.myForm.controls.pdesc.setValue(p.projectDescription);
    this.myForm.controls.psrtdate.setValue(p.projectStartDate);
    this.myForm.controls.penddate.setValue(p.projectEndDate);
  }

  updateTask() {
    console.log(this.myForm)
    // this.proj.projectId = (this.myForm.controls.pid.value) != null ? (this.myForm.controls.pid.value) : '';
    this.proj.projectName = (this.myForm.controls.pname.value) != null ? (this.myForm.controls.pname.value) : '';
    this.proj.projectDescription = (this.myForm.controls.pdesc.value) != null ? (this.myForm.controls.pdesc.value) : '';
    this.proj.projectStartDate = (this.myForm.controls.psrtdate.value) != null ? (this.myForm.controls.psrtdate.value) : '';
    this.proj.projectEndDate = (this.myForm.controls.penddate.value) != null ? (this.myForm.controls.penddate.value) : '';
    this.projService.saveProject(this.proj).subscribe((res: project) => {
      console.log(res);
      document.getElementById('modalClose')?.click();
      this.getProjects();
    });
  }

  newProject() {
    this.myForm.reset();
  }

}
