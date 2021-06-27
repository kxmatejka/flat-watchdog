import {flat} from './types'
import type {Flat, SupportedSource} from './types'
import type {QueryDocumentSnapshot} from 'firebase-functions/lib/providers/firestore'
import {firestore, logInfo} from '../../lib'

const convertor = {
  toFirestore: (data: Flat) => ({
    ...data,
    found: new Date(),
  }),
  fromFirestore: (data: QueryDocumentSnapshot) => flat.validateSync({
    source: data.get('source'),
    externalId: data.get('externalId'),
    url: data.get('url'),
    lng: data.get('lng'),
    lat: data.get('lat'),
    price: data.get('price'),
    description: data.get('description'),
    found: data.get('found').toDate(),
    published: data.get('published').toDate(),
    photos: data.get('photos'),
  }),
}

export const findFlatsBySource = async (source: SupportedSource) => {
  const result = await firestore().collection('/flats')
    .where('source', '==', source)
    .withConverter<Flat>(convertor)
    .get()

  return result.docs.map((record) => record.data()) as Flat[]
}

export const saveFlat = (flat: Flat) => {
  return firestore()
    .collection('/flats')
    .withConverter(convertor)
    .add(flat)
}

export const checkForNewFlats = async (flatsFromApi: Flat[], flatsFromDb: Flat[], onNewFlat: (flat: Flat) => Promise<void>) => {
  let savedFlats = 0
  const flatsFromDbIds = new Set(flatsFromDb.map((flat) => flat.externalId))

  for (const flat of flatsFromApi) {
    if (!flatsFromDbIds.has(flat.externalId)) {
      await onNewFlat(flat)
      savedFlats++
    }
  }

  return {
    savedFlats,
  }
}

export const saveNewFlats = async (fetchFlatsFromApi: () => Promise<Flat[]>, findFlatsBySourceInDb: () => Promise<Flat[]>) => {
  logInfo('Fetching flats from api')
  const flatsFromApi = await fetchFlatsFromApi()
  logInfo(`Found ${flatsFromApi.length} offers in api`)
  logInfo('Finding ulovdomov flats in db')
  const flatsFromDb = await findFlatsBySourceInDb()
  logInfo(`Found ${flatsFromDb.length} offers in db`)

  const {savedFlats} = await checkForNewFlats(flatsFromApi, flatsFromDb, async (flat) => {
    logInfo(`Found new offer id: ${flat.externalId}, url: ${flat.url}`)
    await saveFlat(flat)
  })

  logInfo(`Saved ${savedFlats} flats`)
}
