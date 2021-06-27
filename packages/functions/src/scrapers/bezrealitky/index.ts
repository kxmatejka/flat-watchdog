import {requestPostFormData} from '../../lib'
import {createFlatsFromArray, findFlatsBySource, saveNewFlats} from '../../model'

const URL = 'https://www.bezrealitky.cz/api/record/markers'
const PARAMS = 'offerType=pronajem&estateType=byt&priceFrom=0&disposition=1-1%2C2-kk%2C2-1%2C3-kk%2C3-1%2C4-kk%2C4-1&boundary=%5B%5B%5B%7B%22lat%22%3A50.069005%2C%22lng%22%3A15.704865%7D%2C%7B%22lat%22%3A50.068463%2C%22lng%22%3A15.839791%7D%2C%7B%22lat%22%3A50.006508%2C%22lng%22%3A15.842709%7D%2C%7B%22lat%22%3A50.00078%2C%22lng%22%3A15.730099%7D%5D%5D%5D'

const fetchFlatsFromApi = async () => {
  const response = await requestPostFormData(URL, PARAMS)

  return createFlatsFromArray(response, (record) => {
    const {
      timeOrder: {
        date: published = undefined,
      } = {},
      advertEstateOffer: [
        {gps, price},
      ] = [],
    } = record
    const decodedGps = JSON.parse(gps)

    return {
      source: 'BEZREALITKY',
      externalId: record.id,
      url: `https://www.bezrealitky.cz/nemovitosti-byty-domy/${record.uri}`,
      lng: decodedGps.lng,
      lat: decodedGps.lat,
      price,
      description: '',
      published: new Date(published),
      photos: [],
    }
  })
}

const findFlatsBySourceInDb = () => findFlatsBySource('BEZREALITKY')

export const bezrealitky = () => saveNewFlats(fetchFlatsFromApi, findFlatsBySourceInDb)
