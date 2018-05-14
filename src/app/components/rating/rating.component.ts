import { Teacher } from '../../Models/teachers';
import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  teacher: Teacher[];
  constructor(private teacherService: TeachersService) { }

  ngOnInit() {
    this.teacherService.getTeachers().subscribe(teacher => {
      this.teacher = teacher ;
    });
  }

}
