import { Question } from './../../Models/question';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  question: Question[];

  settings = {


    noDataMessage: 'لا يوجد أسئلة',


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
        title: 'السؤال',
        filter: true,
      },
      // department: {
      //   title: 'القسم',
      //   filter: true,

      // },
      // position: {
      //   title: 'المنصب',
      //   filter: true,
      // },
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
      this.questionService.updateQuestion(event.newData);
      event.newData['name'] += ' + تم التعديل';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }


  onCreateConfirm(event) {
    if (window.confirm('هل أنت متأكد من التعديل')) {
      this.questionService.addQuestion(event.data);
      event.newData['name'] += ' + تم الإضافة';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }


  onDeleteConfirm(event): void {
    if (window.confirm('هل أنت متأكد من الحذف')) {
      this.questionService.deletequestion(event.data);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(question => {
      this.question = question ;
    });
  }

}
