import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{
  @Input() adminUser : boolean = false;
  public name='';
  public email='';
  public password='';
  public list =['Admin','User'];
  @Input() userForm!:FormGroup;
  @Output() closeDialogEmiter:EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    console.log(this.adminUser,"adminuser");
    this.userForm =  this.fb.group({
      username: new FormControl('', [
        Validators.required,
        ]
       ),
      password: new FormControl('', [
        Validators.required,
        ]
       ),
    });
  }
  onSubmit(){
    console.log(this.adminUser);
    
  }
  closeDialog(){
    this.adminUser = false;
    this.closeDialogEmiter.emit(true);
  }
 
}
