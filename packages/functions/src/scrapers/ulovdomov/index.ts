import {logInfo, requestPost, firestore} from '../../lib'
import type { QueryDocumentSnapshot } from 'firebase-functions/lib/providers/firestore'

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

interface Photo {
  url: string
}

interface Flat {
  source: 'ULOVDOMOV'
  externalId: string
  url: string
  lng: number
  lat: number
  price: number
  description: string
  found: Date
  published: Date
  photos: Photo[]
}

const convertor = {
  toFirestore: (data: Partial<Flat>) => ({
    ...data,
    externalId: String(data.externalId),
    source: 'ULOVDOMOV',
    found: new Date(),
  }),
  fromFirestore: (data: QueryDocumentSnapshot) => ({
    source: data.get('source'),
    externalId: data.get('externalId'),
    url: data.get('url'),
    lng: data.get('lng'),
    lat: data.get('lat'),
    price: data.get('price'),
    description: data.get('description'),
    found: data.get('found'),
    published: data.get('published'),
    photos: data.get('photos'),
  }),
}

export const ulovdomov = async () => {
  const flats = await requestPost(URL, PARAMS)

  const savedFlats = await firestore().collection('/flats')
    .where('source', '==', 'ULOVDOMOV')
    .withConverter<Partial<Flat>>(convertor)
    .get()

  const savedFlatsIds = new Set()

  for (const flat of savedFlats.docs) {
    savedFlatsIds.add(flat.data().externalId)
  }

  for (const offer of flats.offers) {
    if (!savedFlatsIds.has(String(offer.id))) {
      logInfo(`Found new offer id: ${offer.id}, url: ${offer.absolute_url}`)
      await firestore()
        .collection('/flats')
        .withConverter<Partial<Flat>>(convertor)
        .add({
          externalId: offer.id,
          url: offer.absolute_url,
          lng: offer.lng,
          lat: offer.lat,
          price: offer.price_rental + offer.price_monthly_fee,
          description: offer.description,
          published: new Date(offer.published_at),
          photos: offer.photos.map((photo: any) => ({url: photo.path})),
        })
    }
  }
}

