import * as functions from 'firebase-functions';

import { db } from './index';


exports.getOpenQuestions = functions.https.onCall((data, context) => {
	if (!context || !context.auth) { throw new functions.https.HttpsError("invalid-argument" , "no context provided"); }
	return db.collection("users").doc(context.auth.uid).get().then(snap => {
		const snapData = snap.data();
		if (!snapData) { throw new functions.https.HttpsError("not-found", "data not found"); }
		return {open: snapData.openAnswers};
	});
});

exports.getQuestion = functions.https.onCall((data, context) => {
	if (!context || !context.auth) { throw new functions.https.HttpsError("invalid-argument", "no context provided"); }
	return db.collection(`users/${context.auth.uid}/answerable`).limit(1).get().then(snap => {

		// get users info about question and its id
		if (snap.empty) { throw new functions.https.HttpsError("not-found", "data not found"); }
		const doc = snap.docs[0];
		if (!doc) { throw new functions.https.HttpsError("not-found", "data not found"); }

		// get general question
		return db.doc(`questions/stats/questions/${doc.id}`).get().then(docSnap => {
			if (!docSnap) { throw new functions.https.HttpsError("invalid-argument", "no context provided"); }

			// get general information
			const docData = docSnap.data();
			if (!docData) { throw new functions.https.HttpsError("invalid-argument", "no context provided"); }

			return {...docData, "id": docSnap.id};
		});
	});
});

exports.addFile = functions.https.onCall((data, context) => {
	if (!context || !context.auth) { throw new functions.https.HttpsError("invalid-argument", "no context provided"); }

	const docRef = db.doc(`users/${context.auth.uid}/answerable/${data.question}`);
	return docRef.get().then(snap => {
		console.log('snap:', snap);

		if (!snap) { throw new functions.https.HttpsError("not-found", "data not found"); }
		const docData = snap.data();
		if (docData === undefined) { throw new functions.https.HttpsError("not-found", "data not found"); }
		if (!docData.files) { docData.files = []; }

		// add file to .files array
		docData.files.push({path: data.path, title: data.title});

		// TODO: add file to static storage with content 'data.content'

		return docRef.set(docData);
	});
});

exports.deleteFile = functions.https.onCall((data, context) => {
	if (!context || !context.auth) { throw new functions.https.HttpsError("invalid-argument", "no context provided"); }

	const docRef = db.doc(`users/${context.auth.uid}/answerable/${data.question}`);
	return docRef.get().then(snap => {

		if (!snap) { throw new functions.https.HttpsError("not-found", "data not found"); }
		const docData = snap.data();
		if (!docData || !docData.files) { throw new functions.https.HttpsError("not-found", "data not found"); }

		// remove file from .files array
		const files: {title: string, path: string}[] = docData.files;
		docData.files = [];
		files.forEach(file => {
			if (file.path !== data.path) { docData.files.push(file); }
		});

		// TODO: delete file from static storage

		return docRef.set(docData);
	});
});
