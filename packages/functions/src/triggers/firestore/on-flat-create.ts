import {logInfo, functions} from '../../lib'
import {flat} from '../../model'
import {sendNotificationEmail} from '../../model'

export const onFlatCreate = functions()
  .firestore
  .document('/flats/{flatId}')
  .onCreate((async (snapshot) => {
    logInfo(`Found a new flat id: ${snapshot.get('externalId')} url: ${snapshot.get('url')}`)

    const parsedFlat = flat.validateSync({
      ...snapshot.data(),
      found: snapshot.get('found').toDate(),
      published: snapshot.get('published').toDate(),
    })
    await sendNotificationEmail(parsedFlat)
  }))
