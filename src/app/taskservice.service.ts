import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  public descriptionSubject =new Subject<String>();
  public commentSubject=new Subject<String>();
  constructor() {
    
   }
}
