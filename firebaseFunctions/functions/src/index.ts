import * as functions from 'firebase-functions';

exports.internal = require('./internal');
exports.general = require('./general');
exports.quiz = require('./quiz');
exports.results = require('./results');


 // Start writing Firebase Functions
 // https://firebase.google.com/docs/functions/typescript

 export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });
