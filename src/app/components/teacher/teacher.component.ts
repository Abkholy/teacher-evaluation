import { Teacher } from './../../Models/teachers';
import { Observable } from 'rxjs/Observable';
import { TeachersService } from './../../services/teachers.service';
import { Component, OnInit, Testability } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { eventNames } from 'cluster';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],

})
export class TeacherComponent implements OnInit {
teacher: Teacher[];
selectedFile: FileList;
file: File;

settings = {


  noDataMessage: 'لا يوجد دكاترة',


  actions: {
    columnTitle: 'تعديل',
  },


  pager: {
    display: true,
    perPage: 5,
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

    name: {
      title: 'اسم عضو هيئة التدريس',
      filter: true,
    },
    department: {
      title: 'القسم',
      filter: true,

    },
    position: {
      title: 'المنصب',
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
    this.teacherservice.updateTeacher(event.newData);
    event.newData['name'] += ' + تم التعديل';
    event.confirm.resolve(event.newData);
  } else {
    event.confirm.reject();
  }
}


onCreateConfirm(event) {
  if (window.confirm('هل أنت متأكد من التعديل')) {
    this.teacherservice.addTeacher(event.data);
    event.newData['name'] += ' + تم التعديل';
    event.confirm.resolve(event.newData);
  } else {
    event.confirm.reject();
  }
}


onDeleteConfirm(event): void {
  if (window.confirm('هل أنت متأكد من الحذف')) {
    this.teacherservice.deleteTeacher(event.data);
    event.confirm.resolve();
  } else {
    event.confirm.reject();
  }
}

  constructor(private teacherservice: TeachersService,
  private strorage: AngularFireStorage) { }

  ngOnInit() {
    this.teacherservice.getTeachers().subscribe(teacher => {
      this.teacher = teacher ;
    });
  }


}
