import { Injectable } from '@angular/core';
import { Student } from '../Models/student';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StudentService {
  studentCollection: AngularFirestoreCollection<Student>;
  students: Observable<Student[]>;
  studentDocument: AngularFirestoreDocument<any>;
  student$: Observable<Student>;
  constructor(private afs: AngularFirestore) {
    const settings = { timestampsInSnapshots: true };
    afs.app.firestore().settings(settings);
    // const timestamp = snapshot.get('created_at');
    // const date = timestamp.toDate();
  }

  getStudents() {
    this.studentCollection = this.afs.collection('student');
    this.students = this.afs
      .collection('student')
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Student;
          data.id = a.payload.doc.id;
          return data;
        });
      });
    return this.students;
  }

  addStudent(student: Student) {
    this.studentCollection = this.afs.collection('student');
    this.students = this.afs
      .collection('student')
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Student;
          data.id = a.payload.doc.id;
          return data;
        });
      });
    this.studentCollection.doc(`${student.stID}`).set(student);
  }
  deleteStudent(student: Student) {
    this.studentCollection = this.afs.collection('student', ref =>
      ref.orderBy('name', 'desc')
    );
    this.students = this.afs
      .collection('student')
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Student;
          data.id = a.payload.doc.id;
          return data;
        });
      });
    this.studentDocument = this.studentCollection.doc(`${student.id}`);
    this.studentDocument.delete();
  }
  updateStudent(student: Student) {
    this.studentCollection = this.afs.collection('student', ref =>
      ref.orderBy('name', 'desc')
    );
    this.students = this.afs
      .collection('student')
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Student;
          data.id = a.payload.doc.id;
          return data;
        });
      });
    this.studentDocument = this.studentCollection.doc(`${student.id}`);
    this.studentDocument.update(student);
  }

  getStudentOne(id) {
    this.studentCollection = this.afs.collection('student', ref =>
      ref.orderBy('name', 'desc')
    );
    this.studentDocument = this.studentCollection.doc(id);
    this.studentDocument.ref.get().then(docSnapshot => {
      if (docSnapshot.exists) {
        this.studentDocument.valueChanges().subscribe(student => {
          this.student$ = student;
          console.log(this.student$);
        });
      } else {
        console.log('not suc');
      }
    });
  }
}
