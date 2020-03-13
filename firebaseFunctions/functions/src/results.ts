import * as functions from 'firebase-functions';

import { db } from './index';


exports.getOpenCorrections = functions.https.onCall((data, context) => {
	if (!context || !context.auth) { throw new functions.https.HttpsError("invalid-argument", "no context provided"); }
	return db.doc(`users/${context.auth.uid}`).get().then(snap => {
		const snapData = snap.data();
		if (!snapData) { throw new functions.https.HttpsError("not-found", "data not found"); }
		return { open: snapData.openCorrections };
	});
});
