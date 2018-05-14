import { Component, OnInit } from '@angular/core';
import { Student } from '../../Models/student';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent implements OnInit {
  student: Student = {
    name: '',
    department: '',
    stID: ``,
    id: ''
      };
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public flashMessagesService: FlashMessagesService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
  }
onSubmit() {
  if (this.student.name !== '') {

    this.studentService.addStudent(this.student);
    this.student.name = '';
    this.student.department = '' ;
    this.student.stID = '';
    this.router.navigate(['/students']);
          // tslint:disable-next-line:max-line-length
    this.flashMessagesService.show('تم الإضافة بنجاح' , {cssClass: 'alert alert-success text-center alert-dismissible fade show ', timeout: 4000} );
}
}
}
