import { Star } from './../../Models/star';
import { QuestionService } from './../../services/question.service';
import { browser, element } from 'protractor';
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TeachersService } from '../../services/teachers.service';
import { Teacher } from '../../Models/teachers';
import { Observable } from 'rxjs/Observable';
import { StarsService } from '../../services/stars.service';
import { RatingModule } from 'ngx-bootstrap/rating';
import { Question } from '../../Models/question';
import { AngularFirestore } from 'angularfire2/firestore';
import { InjectionToken, Inject } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommentModule } from 'ng2-comment';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../Models/comment';

@Component({
  selector: 'app-evaluation-pro',
  templateUrl: './evaluation-pro.component.html',
  styleUrls: ['./evaluation-pro.component.css']
})
export class EvaluationProComponent implements OnInit {
  commentStatus = false;
  question: Question[];
  question$: Question;
  cmnt;
  commentDetils: any[];
  test: Observable<Comment>;
  comment$: Comment[];
  questionName: any;
  questionID: any;
  questionRange: any;
  id: any;
  name: any;
  pic: any;
  department: any;
  position: any;
  teacher$: Teacher;
  title: string;
  singlTeacher: Observable<Teacher>;
disabledLike: boolean ;

  comment: Comment = {
    id: '',
    userId: '',
    teacherId: '',
    date: new(Date),
    comment: '',
    likes: 0,
    dislikes: 0,
disabled: false
  };
  constructor(
    public afs: AngularFirestore,
    public teacherService: TeachersService,
    public questionService: QuestionService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public flashMessagesService: FlashMessagesService,
    private starService: StarsService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.teacherService.getTeacher(this.id).subscribe(teacher$ => {
      this.teacher$ = teacher$;
      this.name = teacher$.name;
      this.pic = teacher$.pic;
      this.position = teacher$.position;
      this.department = teacher$.department;
      this.id = teacher$.id;
    });
    this.questionService.getQuestions().subscribe(question => {
      this.question = question;
    });

    this.commentService.getCommentsForTeacher(this.id).subscribe(comment => {
      this.comment$ = comment;
    });
  }

  onSubmit(questionId, name, range) {
    this.starService.addquestiontoteacher(name, questionId);
    this.starService.addStars(name, questionId, range);
  }

  addComent(comnt) {
    const  d = new Date();
    this.comment.teacherId = this.name;
    this.comment.comment = comnt;
    this.comment.date = d;
    this.comment.disabled = false;
    this.commentService.addCommentToTeacher(this.name, this.comment);
    this.comment.comment = '';

  }

  likeHandler(i, value, commentID, comment) {
    this.commentService.addLike(this.name, commentID, value + 1);
    this.comment.disabled = true;
  }

  dislikeHandler(i, value, commentID , comment) {
    this.commentService.adddislike(this.name, commentID, value - 1);
    this.comment.disabled = true;

  }

}
