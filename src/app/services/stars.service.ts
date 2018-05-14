import { Question } from './../Models/question';
import { Star } from '../Models/star';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, docChanges} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { CollectionReference } from '@firebase/firestore-types';

export interface Review {
  id?: any;
star: number;
}
@Injectable()
export class StarsService {
  questionID: any;
  questionData: Question[];
  noOfFairs;

  starID: any;
  starData: Star[];
  reviewList;
  reviewListob;
starsList;
starsListob;
  stars$: Observable<Star>;
starsCollection: AngularFirestoreCollection<Star>;
totalStars: any;
stars: Observable<any>;
starDocument: AngularFirestoreDocument<any>;
  constructor(private afs: AngularFirestore ) {
    const settings = {timestampsInSnapshots: true};
    afs.app.firestore().settings(settings);
  }



// getNoOfQuestion(teacherID) {
// this.reviewList =  this.afs.collection('teacher').doc(teacherID).collection(`review`).snapshotChanges();

// this.reviewListob = this.reviewList.subscribe(reviewOb => {
//   this.noOfFairs = reviewOb.length;
//   this.questionData = reviewOb ;
// });
// console.log(this.questionData);
// }

// }



addquestiontoteacher(teacherID: string, questionID: string) {
  this.starsCollection = this.afs.collection('teacher').doc(teacherID).collection(`review`);
  this.stars = this.afs
  .collection('question')
    .snapshotChanges()
    .map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Star;
        data.id = a.payload.doc.id;
        return data;
      });
    });
this.starsCollection.doc(`${questionID}`).set({ question: questionID });
}


addStars(teacherID: string, questionID: string , star: Star) {
  this.starsCollection = this.afs.collection('teacher').doc(teacherID).collection(`review`).doc(`${questionID}`).collection(`stars`);
this.stars = this.afs
  .collection('teacher').doc(teacherID).collection(`review`).doc(questionID).collection(`stars`)
    .snapshotChanges()
    .map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Star;
        data.id = a.payload.doc.id;
        return data;
      });
    });
this.starsCollection.doc(`stars in ${Date()}`).set({ star: star });
}
 //   = this.afs.collection('teacher').doc(teacherID).collection(`review`);
  // this.starsList.ref.get().then(collections => {
  //   collections.forEach(collection => {
  //       console.log('Found subcollection with id:', collection.docs.length);
  //   });
  // });
}
