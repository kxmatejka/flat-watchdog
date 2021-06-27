import {flat, flats} from './types'
import type {Flat, SupportedSource} from './types'
import type {QueryDocumentSnapshot} from 'firebase-functions/lib/providers/firestore'
import {firestore} from '../../lib'

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

export const findFlatsBySource = (source: SupportedSource) => {
  return firestore().collection('/flats')
    .where('source', '==', source)
    .withConverter<Flat>(convertor)
    .get()
}

export const saveFlat = (flat: Flat) => {
  return firestore()
    .collection('/flats')
    .withConverter(convertor)
    .add(flat)
}
