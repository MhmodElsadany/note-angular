import { Component, OnInit } from '@angular/core';
import { NotesServicesService } from 'src/app/services/notes-services.service';
import {Observable}  from 'rxjs'
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
 model : FeedbackModel = {name:'',email:'',feedback:''}


  constructor(private service:NotesServicesService) { }

  ngOnInit(): void {
  }

  sendFeedback(){

    this.service.saveFeedback(this.model).subscribe(
      data => {
        console.log("kkkkk", this.model.name);
        console.log("kkkkk", data);
      }
    );

  }
}
export interface FeedbackModel{
  name:String;
  email:String;
  feedback:String;

}
