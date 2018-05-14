import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../../Models/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  student: Student[];
  settings = {


    noDataMessage: 'لا يوجد دكاترة',


    actions: {
      columnTitle: 'تعديل',
    },


    pager: {
      display: true,
      perPage: 15,
    },

    // CRUD

    add: {
      addButtonContent: '<i class="fa fa-plus" title="إضافة"></i>',
      createButtonContent: '<i class="fa fa-check" title="إضافة"></i>',
      cancelButtonContent: '<i class="fa fa-close" title="إلغاء"></i>',
    },

    edit: {
      editButtonContent: '<i class="fa fa-pencil" title="تعديل"></i>',
      saveButtonContent: '<i class="fa fa-floppy-o" title="حفظ"></i>',
      cancelButtonContent: '<i class="fa fa-close" title="إلغاء"></i>',
      confirmSave: true,
    },

    delete: {
      deleteButtonContent: '<i class="fa fa-trash-o"></i>',
      confirmDelete: true,
    },

    // Filter

    filter: {
      inputClass: 'filter-smart-table'
    },

    // Spalten

    columns: {

      stID: {
        title: 'كود الطالب  ',
        filter: true,
      },
      name: {
        title: 'اسم الطالب',
        filter: true,

      },
      department: {
        title: 'القسم',
        filter: true,
      },
      // pic: {
      //   title: 'الصورة',
      //   type: 'html',
      //   valuePrepareFunction: (image) => `<img src="teacher.pic">`,
      //   filter: false,

      // },
    },
  };
  onSaveConfirm(event): void {
    if (window.confirm('هل أنت متأكد من التعديل')) {
      this.studentService.updateStudent(event.newData);
      event.newData['name'] += ' + تم التعديل';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }


  onCreateConfirm(event) {
    if (window.confirm('هل أنت متأكد من التعديل')) {

      // this.teacherservice.addTeacher(event.data);
      event.newData['name'] += ' + تم التعديل';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }


  onDeleteConfirm(event): void {
    if (window.confirm('هل أنت متأكد من الحذف')) {
      this.studentService.deleteStudent(event.data);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe(stud => {
      this.student = stud ;
    });
  }

}
