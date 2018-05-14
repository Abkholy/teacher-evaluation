import { Question } from './../Models/question';
import { Comment } from '../Models/comment';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  docChanges
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { CollectionReference } from '@firebase/firestore-types';

@Injectable()
export class CommentService {
  commentCollection: AngularFirestoreCollection<Comment>;
  comment: Observable<Comment[]>;
  commentDocument: AngularFirestoreDocument<Comment>;

  constructor(private afs: AngularFirestore) {
    // const settings = { timestampsInSnapshots: true };
    // afs.app.firestore().settings(settings);
  }

  addCommentToTeacher(teacherID: string, comment: Comment) {
    this.commentCollection = this.afs
      .collection('teacher')
      .doc(teacherID)
      .collection(`comments`);
    this.comment = this.afs
      .collection('teacher')
      .doc(teacherID)
      .collection(`comments`)
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Comment;
          data.id = a.payload.doc.id;
          return data;
        });
      });
    this.commentCollection.doc(`${new Date()}`).set(comment);
  }

  getCommentsForTeacher(teacherID: string) {
    this.commentCollection = this.afs
      .collection('teacher')
      .doc(teacherID)
      .collection(`comments`);

    this.comment = this.afs
      .collection('teacher')
      .doc(teacherID)
      .collection(`comments`)
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Comment;
          data.id = a.payload.doc.id;
          return data;
        });
      });

    return this.comment;
  }

  addLike(teacherID: string, commentID: string, like) {
    this.commentCollection = this.afs
      .collection('teacher')
      .doc(teacherID)
      .collection(`comments`);
    this.comment = this.afs
      .collection('teacher')
      .doc(teacherID)
      .collection(`comments`)
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Comment;
          data.id = a.payload.doc.id;
          return data;
        });
      });

    this.commentDocument = this.afs.doc(
      `teacher/${teacherID}/comments/${commentID}`
    );
    this.commentDocument.update({likes: like});
  }

  adddislike(teacherID: string, commentID: string, disklike) {
    this.commentCollection = this.afs
      .collection('teacher')
      .doc(teacherID)
      .collection(`comments`);
    this.comment = this.afs
      .collection('teacher')
      .doc(teacherID)
      .collection(`comments`)
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Comment;
          data.id = a.payload.doc.id;
          return data;
        });
      });

    this.commentDocument = this.afs.doc(
      `teacher/${teacherID}/comments/${commentID}`
    );
    this.commentDocument.update({dislikes: disklike});
  }

  changeDisapledstatus(teacherID: string, commentID: string, disabled: boolean) {
    this.commentCollection = this.afs
      .collection('teacher')
      .doc(teacherID)
      .collection(`comments`);
    this.comment = this.afs
      .collection('teacher')
      .doc(teacherID)
      .collection(`comments`)
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Comment;
          data.id = a.payload.doc.id;
          return data;
        });
      });

    this.commentDocument = this.afs.doc(
      `teacher/${teacherID}/comments/${commentID}`
    );
    this.commentDocument.update({disabled: disabled});
  }
  getDocumentComment(teacherID: string, commentID: string, comment: Comment) {
    this.commentCollection = this.afs
      .collection('teacher')
      .doc(teacherID)
      .collection(`comments`);
    this.comment = this.afs
      .collection('teacher')
      .doc(teacherID)
      .collection(`comments`)
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Comment;
          data.id = a.payload.doc.id;
          return data;
        });
      });

    this.commentDocument = this.afs.doc(
      `teacher/${teacherID}/comments/${commentID}`
    );
    this.commentDocument.ref.get();
    return this.commentDocument;
  }
}
