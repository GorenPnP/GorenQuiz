import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp();

export const db = admin.firestore();


exports.internal = require('./internal');
exports.general = require('./general');
exports.quiz = require('./quiz');
exports.results = require('./results');


 // Start writing Firebase Functions
 // https://firebase.google.com/docs/functions/typescript

 export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });
