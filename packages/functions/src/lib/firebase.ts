import * as admin from 'firebase-admin'

const app = admin.initializeApp()

export const firestore = () => app.firestore()
