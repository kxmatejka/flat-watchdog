import {logInfo, postJson} from '../../lib'
import {flats, findFlatsBySource, saveFlat} from '../../model'

const URL = 'https://www.ulovdomov.cz/fe-api/find'
const PARAMS = {
  'query': 'Pardubice',
  'offer_type_id': '1',
  'dispositions': [
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ],
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
  'limit': 100,
  'text': null,
  'zoom': null,
  'ne_lat': null,
  'ne_lng': null,
  'sw_lat': null,
  'sw_lng': null,
  'banner_panel_width_type': 480,
  'bounds': {
    'north_east': {
      'lng': 15.840053558349611,
      'lat': 50.08545454322119,
    },
    'south_west': {
      'lng': 15.713367462158205,
      'lat': 49.98180587165547,
    },
  },
  'average_first_contact_in_seconds': 840,
  'test_1': null,
  'test_2': null,
  'is_banner_premium_board': false,
  'is_banner_premium_board_brno': false,
}

const requestFlats = async () => {
  const response = await postJson(URL, PARAMS)

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

  const savedFlats = await findFlatsBySource('ULOVDOMOV')

  const savedFlatsIds = new Set()

  for (const flat of savedFlats.docs) {
    savedFlatsIds.add(flat.data().externalId)
  }

  for (const flat of flats) {
    if (!savedFlatsIds.has(flat.externalId)) {
      logInfo(`Found new offer id: ${flat.externalId}, url: ${flat.url}`)
      await saveFlat(flat)
    }
  }
}
