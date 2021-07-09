import {requestPostFormData} from '../../lib'
import {createFlatsFromArray, DISPOSITIONS, findFlatsBySource, saveNewFlats} from '../../model'

const URL = 'https://www.bezrealitky.cz/api/record/markers'
const PARAMS = 'offerType=pronajem&estateType=byt&priceFrom=0&boundary=%5B%5B%5B%7B%22lat%22%3A50.069005%2C%22lng%22%3A15.704865%7D%2C%7B%22lat%22%3A50.068463%2C%22lng%22%3A15.839791%7D%2C%7B%22lat%22%3A50.006508%2C%22lng%22%3A15.842709%7D%2C%7B%22lat%22%3A50.00078%2C%22lng%22%3A15.730099%7D%5D%5D%5D'

const dispositionsMap = {
  'garsoniera': DISPOSITIONS.STUDIO,
  '1-kk': DISPOSITIONS['1+kk'],
  '1-1': DISPOSITIONS['1+1'],
  '2-kk': DISPOSITIONS['2+kk'],
  '2-1': DISPOSITIONS['2+1'],
  '3-kk': DISPOSITIONS['3+kk'],
  '3-1': DISPOSITIONS['3+1'],
  '4-kk': DISPOSITIONS['4+kk'],
  '4-1': DISPOSITIONS['4+1'],
  '5-kk': DISPOSITIONS['5+'],
  '5-1': DISPOSITIONS['5+'],
  '6-kk': DISPOSITIONS['5+'],
  '6-1': DISPOSITIONS['5+'],
  '7-kk': DISPOSITIONS['5+'],
  '7-1': DISPOSITIONS['5+'],
  'ostatni': DISPOSITIONS.ATYPICAL,
}

const fetchFlatsFromApi = async () => {
  const response = await requestPostFormData(URL, PARAMS)

  return createFlatsFromArray(response, (record) => {
    const {
      timeOrder: {
        date: published = undefined,
      } = {},
      advertEstateOffer: [
        {gps, price, surface, keyDisposition},
      ] = [],
    } = record
    const decodedGps = JSON.parse(gps)

    return {
      source: 'BEZREALITKY',
      offerType: 'RENT',
      externalId: record.id,
      url: `https://www.bezrealitky.cz/nemovitosti-byty-domy/${record.uri}`,
      lng: decodedGps.lng,
      lat: decodedGps.lat,
      price,
      surface,
      description: '',
      published: new Date(published),
      // @ts-ignore
      disposition: dispositionsMap[keyDisposition],
      photos: [],
    }
  })
}

const findFlatsBySourceInDb = () => findFlatsBySource('BEZREALITKY')

export const bezrealitky = () => saveNewFlats(fetchFlatsFromApi, findFlatsBySourceInDb)
