import {requestPostJson} from '../../lib'
import {createFlatsFromArray, findFlatsBySource, saveNewFlats} from '../../model'

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
      'lng': 15.839791,
      'lat': 50.068463,
    },
    'south_west': {
      'lng': 15.730099,
      'lat': 50.00078,
    },
  },
  'average_first_contact_in_seconds': 840,
  'test_1': null,
  'test_2': null,
  'is_banner_premium_board': false,
  'is_banner_premium_board_brno': false,
}

const fetchFlatsFromApi = async () => {
  const response = await requestPostJson(URL, PARAMS)

  return createFlatsFromArray(response.offers ?? [], (record) => ({
    source: 'ULOVDOMOV',
    externalId: record.id,
    url: record.absolute_url,
    lng: record.lng,
    lat: record.lat,
    price: record.price_rental + record.price_monthly_fee,
    description: record.description,
    published: new Date(record.published_at),
    photos: record.photos?.map((photo: any) => ({url: photo.path})) ?? [],
  }))
}

const findFlatsBySourceInDb = () => findFlatsBySource('ULOVDOMOV')

export const ulovdomov = () => saveNewFlats(fetchFlatsFromApi, findFlatsBySourceInDb)
