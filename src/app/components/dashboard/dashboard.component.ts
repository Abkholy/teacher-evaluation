import { StloginGuard } from './../../guards/stlogin.guard';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../Models/student';
import { AngularFirestore , AngularFirestoreCollection , AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentCollection: AngularFirestoreCollection<Student>;
  studentDocument: AngularFirestoreDocument<Student>;
public  student$: Observable<Student>;
autherized = false ;
stName;
stDepartment;
stID;
studentID;
settings;
    constructor(
      public router: Router,
      public activatedRoute: ActivatedRoute,
      public flashMessagesService: FlashMessagesService,
      private studentService: StudentService,
    private afs: AngularFirestore,
    private stg: StloginGuard
  ) { }

  ngOnInit( ) {
  }

  id(studentID) {
// this.studentService.getStudentOne(studentID);

this.studentCollection = this.afs.collection('student', ref =>
ref.orderBy('name', 'desc')
);
this.studentDocument = this.studentCollection.doc(studentID);
this.studentDocument.ref.get().then(docSnapshot => {
 if (docSnapshot.exists) {
   this.stg.Autherized = true;
return this.onSucess(studentID);

} else {
  this.stg.Autherized = false ;
return this.notSucess();
}
});

  }


  onSucess(studentID) {
    this.router.navigate(['/rating']);
    // tslint:disable-next-line:max-line-length
    this.flashMessagesService.show(`تم الدخول بنجاح` , {cssClass: 'alert alert-success text-center alert-dismissible fade show ', timeout: 4000} );
    localStorage.setItem('currentUser', JSON.stringify({ ID: studentID, valid: true }));


  }


  notSucess() {
    this.router.navigate(['/error'] );
        this.flashMessagesService.show('خطأ في كلمة السر' , {cssClass: 'alert alert-danger block', timeout: 4000} );
  }
}
