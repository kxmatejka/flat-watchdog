import {logInfo, postFormData} from '../../lib'
import {flats, findFlatsBySource, saveFlat} from '../../model'

const URL = 'https://www.bezrealitky.cz/api/record/markers'
const PARAMS = 'offerType=pronajem&estateType=byt&priceFrom=0&disposition=1-1%2C2-kk%2C2-1%2C3-kk%2C3-1%2C4-kk%2C4-1&boundary=%5B%5B%5B%7B%22lat%22%3A50%2C%22lng%22%3A12%7D%2C%7B%22lat%22%3A50%2C%22lng%22%3A16%7D%2C%7B%22lat%22%3A48%2C%22lng%22%3A16%7D%2C%7B%22lat%22%3A48%2C%22lng%22%3A12%7D%2C%7B%22lat%22%3A50%2C%22lng%22%3A12%7D%5D%5D%5D'

const fetchFlats = async () => {
  const response = await postFormData(URL, PARAMS)

  const result = flats.validateSync(response.map((offer: any) => {
    const {
      timeOrder: {
        date: published = undefined,
      } = {},
      advertEstateOffer: [
        {gps, price},
      ] = [],
    } = offer
    const decodedGps = JSON.parse(gps)
 
    return {
      source: 'BEZREALITKY',
      externalId: offer.id,
      url: `https://www.bezrealitky.cz/nemovitosti-byty-domy/${offer.uri}`,
      lng: decodedGps.lng,
      lat: decodedGps.lat,
      price,
      description: '',
      published: new Date(published),
      photos: [],
    }
  }))

  return (result) ? result : []
}

export const bezrealitky = async () => {
  const flats = await fetchFlats()

  const savedFlats = await findFlatsBySource('BEZREALITKY')

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