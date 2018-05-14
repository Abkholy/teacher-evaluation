import { Question } from './../../Models/question';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import {Router , ActivatedRoute , Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {

  question: Question = {
    name: '',
    id: ''
      };
  constructor(private questionService: QuestionService,
    public router: Router,
  public activatedRoute: ActivatedRoute,
  public flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }
  onSubmit() {

    if (this.question.name !== '') {
      this.questionService.addQuestion(this.question);
      this.question.name = '';
      this.router.navigate(['/question']);
            // tslint:disable-next-line:max-line-length
      this.flashMessagesService.show('تم الإضافة بنجاح' , {cssClass: 'alert alert-success text-center alert-dismissible fade show ', timeout: 4000} );
}
    }
}
