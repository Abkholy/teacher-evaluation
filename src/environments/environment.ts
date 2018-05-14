// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false ,

  automaticDataCollectionEnabled: true,
  firebase: {
    apiKey: 'AIzaSyAucS0jkan4AlQLB-GmjswG037a3w7oySQ',
    authDomain: 'evaluations-3782f.firebaseapp.com',
    databaseURL: 'https://evaluations-3782f.firebaseio.com',
    projectId: 'evaluations-3782f',
    storageBucket: 'evaluations-3782f.appspot.com',
    messagingSenderId: '300193134254'
}
};
