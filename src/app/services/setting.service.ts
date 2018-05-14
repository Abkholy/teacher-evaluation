

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Settings } from '../Models/settings';


@Injectable()
export class SettingsService {
settingsColl: AngularFirestoreCollection<any>;
settingsObs: Observable<any>;
settingsDoc: AngularFirestoreDocument<any>;

settings: Settings = {
  isRegisterOpen: true,
};

constructor() {
  if (localStorage.getItem('settings') != null) {
    this.settings = JSON.parse(localStorage.getItem('currentUser'));
  }
}

getSettings() {
  return this.settings;
}


changeSettings(settings: Settings) {
   localStorage.setItem('settings', JSON.stringify(settings));
}



}
