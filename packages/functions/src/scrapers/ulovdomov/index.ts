import {logInfo, requestPost, firestore} from '../../lib'
import {flat, flats, Flat} from '../../model'
import type {QueryDocumentSnapshot} from 'firebase-functions/lib/providers/firestore'

const URL = 'https://www.ulovdomov.cz/fe-api/find'
const PARAMS = {
  'query': 'Pardubice',
  'offer_type_id': '1',
  'dispositions': [],
  'price_from': '',
  'price_to': '',
  'acreage_from': '',
  'acreage_to': '',
  'added_before': '',
  'furnishing': [],
  'conveniences': [],
  'is_price_commision_free': null,
  'sort_by': '',
  'page': 1,
  'limit': 20,
  'text': null,
  'zoom': null,
  'ne_lat': null,
  'ne_lng': null,
  'sw_lat': null,
  'sw_lng': null,
  'banner_panel_width_type': 480,
  'bounds': {
    'north_east': {
      'lng': 15.836448669433596,
      'lat': 50.08809796366313,
    },
    'south_west': {
      'lng': 15.709762573242188,
      'lat': 49.98445500410872,
    },
  },
  'average_first_contact_in_seconds': 840,
  'test_1': null,
  'test_2': null,
  'is_banner_premium_board': false,
  'is_banner_premium_board_brno': false,
}

const convertor = {
  toFirestore: (data: Flat) => ({
    ...data,
    found: new Date(),
  }),
  fromFirestore: (data: QueryDocumentSnapshot) => {
    return flat.validateSync({
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
    })
  },
}

const requestFlats = async () => {
  const response = await requestPost(URL, PARAMS)

  const result = flats.validateSync(response.offers?.map((offer: any) => ({
    source: 'ULOVDOMOV',
    externalId: offer.id,
    url: offer.absolute_url,
    lng: offer.lng,
    lat: offer.lat,
    price: offer.price_rental + offer.price_monthly_fee,
    description: offer.description,
    published: new Date(offer.published_at),
    photos: offer.photos?.map((photo: any) => ({url: photo.path})) ?? [],
  })))

  return (result) ? result : []
}

export const ulovdomov = async () => {
  const flats = await requestFlats()

  const savedFlats = await firestore().collection('/flats')
    .where('source', '==', 'ULOVDOMOV')
    .withConverter<Flat>(convertor)
    .get()

  const savedFlatsIds = new Set()

  for (const flat of savedFlats.docs) {
    savedFlatsIds.add(flat.data().externalId)
  }

  for (const flat of flats) {
    if (!savedFlatsIds.has(flat.externalId)) {
      logInfo(`Found new offer id: ${flat.externalId}, url: ${flat.url}`)
      await firestore()
        .collection('/flats')
        .withConverter(convertor)
        .add(flat)
    }
  }
}
