import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

const usersCol = db.collection('users');

exports.addUser = functions.auth.user().onCreate((user) => {
	return usersCol.doc(user.uid).create({ email: user.email });
});

/**
 * deletes user/${uid} recursively and collects all mentions of static files (to move or delete them)
 */
exports.deleteUser = functions.auth.user().onDelete((user) => {

	const USER_DOC = usersCol.doc(user.uid);
	const ARCHIVED_USER_DOC = db.collection("archived").doc(user.uid);

	// get all collections under users/uid
	return USER_DOC.listCollections().then(cols => {
		const COLLECTIONS_REF: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>[] = cols;
		const listDocPromises: Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>[]>[] = [];

		// get all their files
		COLLECTIONS_REF.forEach(col => listDocPromises.push(col.listDocuments()));
		return Promise.all(listDocPromises).then(async q => {
			const queries: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>[][] = q;

			const copyDocPromises: Promise<FirebaseFirestore.WriteResult | undefined>[] = [];
			const deleteDocPromises: Promise<FirebaseFirestore.WriteResult>[] = [USER_DOC.delete()];

			// copy main user file from user/uid to archived/uid
			await USER_DOC.get().then(snap => {
				const data = snap.data();
				if (data) { return ARCHIVED_USER_DOC.create(data); }
				return;
			});

			// gather promises to copy and delete all files (and collections)
			queries.forEach(query => {
				query.forEach(doc => {

					const p: Promise<FirebaseFirestore.WriteResult|undefined> = doc.get().then(snap => {
						const data = snap.data();
						if (data) { return ARCHIVED_USER_DOC.collection(doc.parent.id).doc(doc.id).create(data); }
						return;
					});

					copyDocPromises.push(p)
					deleteDocPromises.push(doc.delete())
				});
			});

			// copy and delete all remaining
			return Promise.all(copyDocPromises).then(_ => {
				return Promise.all(deleteDocPromises)

				// TODO: copy static files into archived/uid/static
			});
		});
	});
});
