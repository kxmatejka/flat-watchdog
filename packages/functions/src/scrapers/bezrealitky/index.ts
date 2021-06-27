import {logInfo, postFormData} from '../../lib'
import {createFlatsFromArray, findFlatsBySource, saveFlat, checkForNewFlats} from '../../model'

const URL = 'https://www.bezrealitky.cz/api/record/markers'
const PARAMS = 'offerType=pronajem&estateType=byt&priceFrom=0&disposition=1-1%2C2-kk%2C2-1%2C3-kk%2C3-1%2C4-kk%2C4-1&boundary=%5B%5B%5B%7B%22lat%22%3A50%2C%22lng%22%3A12%7D%2C%7B%22lat%22%3A50%2C%22lng%22%3A16%7D%2C%7B%22lat%22%3A48%2C%22lng%22%3A16%7D%2C%7B%22lat%22%3A48%2C%22lng%22%3A12%7D%2C%7B%22lat%22%3A50%2C%22lng%22%3A12%7D%5D%5D%5D'

const fetchFlats = async () => {
  const response = await postFormData(URL, PARAMS)

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

export const bezrealitky = async () => {
  logInfo('Fetching flats from bezrealitky api')
  const flatsFromApi = await fetchFlats()
  logInfo('Finding bezrealitky flats in db')
  const flatsFromDb = await findFlatsBySource('BEZREALITKY')

  await checkForNewFlats(flatsFromApi, flatsFromDb, async (flat) => {
    logInfo(`Found new offer id: ${flat.externalId}, url: ${flat.url}`)
    await saveFlat(flat)
  })
}
