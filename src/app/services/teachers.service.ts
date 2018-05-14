import { Injectable } from '@angular/core';
import { Teacher } from '../Models/teachers';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TeachersService {
  teachersCollections: AngularFirestoreCollection<Teacher>;
  teacher: Observable<Teacher[]>;
  teacher$: Observable<Teacher>;
  teachersDoc: AngularFirestoreDocument<any>;
  constructor(public afs: AngularFirestore) {
    const settings = { timestampsInSnapshots: true };
    afs.app.firestore().settings(settings);

  }

  getTeachers() {
    this.teachersCollections = this.afs.collection('teacher');
    this.teacher = this.teachersCollections.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Teacher;
        data.id = a.payload.doc.id;
        return data;
      });
    });

    return this.teacher;
  }

  getTeacher(id: string) {
    return (this.teacher$ = this.afs
      .collection('teacher')
      .doc<Teacher>(id)
      .valueChanges());
  }

  addTeacher(teacher: Teacher) {
    this.teachersCollections = this.afs.collection('teacher');
    this.teacher = this.afs
      .collection('teacher')
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Teacher;
          data.id = a.payload.doc.id;
          return data;
        });
      });
    this.teachersCollections.doc(`${teacher.name}`).set(teacher);
  }

  updateTeacher(teacher: Teacher) {
    this.teachersCollections = this.afs.collection('teacher', ref =>
      ref.orderBy('name', 'desc')
    );
    this.teacher = this.afs
      .collection('teacher')
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Teacher;
          data.id = a.payload.doc.id;
          return data;
        });
      });

    this.teachersDoc = this.afs.doc(`teacher/${teacher.id}`);
    this.teachersDoc.update(teacher);
  }
  deleteTeacher(teacher: Teacher) {
    this.teachersCollections = this.afs.collection('teacher', ref =>
      ref.orderBy('name', 'desc')
    );
    this.teacher = this.afs
      .collection('teacher')
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Teacher;
          data.id = a.payload.doc.id;
          return data;
        });
      });
    this.teachersDoc = this.afs.doc(`teacher/${teacher.id}`);
    this.teachersDoc.delete();
  }
}
