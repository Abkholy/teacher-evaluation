import { Injectable } from '@angular/core';
import { Question } from '../Models/question';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuestionService {
  quetioncollection: AngularFirestoreCollection<Question>;
  question: Observable<Question[]>;
  question$: Observable<Question>;
  questionDoc: AngularFirestoreDocument<any>;
  constructor(public afs: AngularFirestore) {
    const settings = { timestampsInSnapshots: true };
    afs.app.firestore().settings(settings);
  }

  getQuestions() {
    this.quetioncollection = this.afs.collection('question');
    this.question = this.quetioncollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Question;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.question;
  }

  getQuestion(id: string) {
    return (this.question$ = this.afs
      .collection('question')
      .doc<Question>(id)
      .valueChanges());
  }

  addQuestion(qustion: Question) {
    this.quetioncollection = this.afs.collection('question', ref =>
      ref.orderBy('fromDate', 'desc')
    );
    this.question = this.afs
      .collection('question')
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Question;
          data.id = a.payload.doc.id;
          return data;
        });
      });
    this.quetioncollection.doc(`${qustion.name}`).set(qustion);
  }

  updateQuestion(question: Question) {
    this.quetioncollection = this.afs.collection('question', ref =>
      ref.orderBy('name', 'desc')
    );
    this.question = this.afs
      .collection('teacher')
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Question;
          data.id = a.payload.doc.id;
          return data;
        });
      });

    this.questionDoc = this.afs.doc(`question/${question.id}`);
    this.questionDoc.update(question);
  }

  deletequestion(question: Question) {
    this.quetioncollection = this.afs.collection('question', ref =>
      ref.orderBy('name', 'desc')
    );
    this.question = this.afs
      .collection('teacher')
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Question;
          data.id = a.payload.doc.id;
          return data;
        });
      });

    this.questionDoc = this.afs.doc(`question/${question.id}`);
    this.questionDoc.delete();
  }
}
