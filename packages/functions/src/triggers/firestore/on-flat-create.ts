import {logInfo, functions} from '../../lib'
import {flat} from '../../model'
import {sendNotificationEmail} from '../../model'

export const onFlatCreate = functions()
  .firestore
  .document('/flats/{flatId}')
  .onCreate((async (snapshot) => {
    const parsedFlat = flat.validateSync(snapshot.data())
    logInfo(`Found a new flat id: ${parsedFlat.externalId} url: ${parsedFlat.url}`)
    await sendNotificationEmail(parsedFlat)
  }))
