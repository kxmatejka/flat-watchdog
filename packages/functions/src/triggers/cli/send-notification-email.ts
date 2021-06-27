import {sendNotificationEmail, getFlatById} from '../../model'

(async () => {
  const [,,documentId] = process.argv

  if (!documentId) {
    throw new Error('Invalid argument. Usage: send-notification-email.ts $documentId')
  }

  const flat = await getFlatById(documentId)
  await sendNotificationEmail(flat)
})()
