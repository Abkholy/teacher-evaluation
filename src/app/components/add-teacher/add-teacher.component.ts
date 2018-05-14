import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const FILE_SIZE_UNITS_LONG = ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Pettabytes', 'Exabytes', 'Zettabytes', 'Yottabytes'];
import { tap } from 'rxjs/operators';
import { Teacher } from '../../Models/teachers';
import { TeachersService } from '../../services/teachers.service';
import { ENGINE_METHOD_DIGESTS } from 'constants';
import {Router , ActivatedRoute , Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;
  path;
  teacher: Teacher = {
  name: '',
  department: '',
  pic: ``,
  position: ''
    };

constructor(private storage: AngularFireStorage, private db: AngularFirestore ,
  private teacherservice: TeachersService ,
  public router: Router,
  public activatedRoute: ActivatedRoute,
  public flashMessagesService: FlashMessagesService,

) {}


toggleHover(event: boolean) {
  this.isHovering = event;
}



// Determines if the upload task is active
isActive(snapshot) {
  return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
}
  ngOnInit() {
  }
start(event: FileList) {

  const file = event.item(0);
  if (file.type.split('/')[0] !== 'image') {
    console.error('unsupported file type :( ');
    return;
  }
  const path = `img/${new Date().getTime()}_${file.name}`;
  const customMetadata = { app: 'Evaluations' };
  this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          // this.db.collection('teacher').doc(`${this.teacher.name}`).collection('image').add( { path, size: snap.totalBytes }) ;
        }
      })
    );

    this.downloadURL = this.task.downloadURL();

}

  // startUpload(event: FileList) {
  //   // The File object

  //       const file = event.item(0);

  //   // Client-side validation example
  //   if (file.type.split('/')[0] !== 'image') {
  //     console.error('unsupported file type :( ');
  //     return;
  //   }

  //   // The storage path
  //   const path = `img/${new Date().getTime()}_${file.name}`;
  //   // Totally optional metadata
  //   const customMetadata = { app: 'Evaluations' };

  //   // The main task
  //   this.task = this.storage.upload(path, file, { customMetadata });

  //   // Progress monitoring
  //   this.percentage = this.task.percentageChanges();
  //   this.snapshot   = this.task.snapshotChanges().pipe(
  //     tap(snap => {
  //       if (snap.bytesTransferred === snap.totalBytes) {
  //         // Update firestore on completion
  //         this.db.collection('teacher').doc(`${this.teacher.name}`).collection('image').add( { path, size: snap.totalBytes }) ;
  //       }
  //     })
  //   );

  //   // The file's download URL
  //   this.downloadURL = this.task.downloadURL();
  // }

  onSubmit() {

    if (this.teacher.name !== '') {
      this.downloadURL.subscribe(URL => {
        this.path = URL ;
      }) ;
      this.teacher.pic = this.path;
      this.teacherservice.addTeacher(this.teacher);
      this.teacher.name = '';
      this.teacher.department = '' ;
      this.teacher.position = '';
      this.router.navigate(['/teachers']);
            // tslint:disable-next-line:max-line-length
      this.flashMessagesService.show('تم الإضافة بنجاح' , {cssClass: 'alert alert-success text-center alert-dismissible fade show ', timeout: 4000} );
}
    }
}
