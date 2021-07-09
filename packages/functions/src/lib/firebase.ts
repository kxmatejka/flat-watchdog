import * as admin from 'firebase-admin'
import * as firebaseFunctions from 'firebase-functions'

const app = admin.initializeApp({projectId: 'flat-watchdog'})
const firebaseFunctionsWithRegion = firebaseFunctions.region('europe-west3')

export const firestore = () => app.firestore()
export const functions = () => firebaseFunctionsWithRegion
