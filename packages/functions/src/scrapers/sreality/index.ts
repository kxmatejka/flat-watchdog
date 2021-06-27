import {logInfo, requestGet} from '../../lib'
import {checkForNewFlats, createFlatsFromArray, findFlatsBySource, saveFlat} from '../../model'

const URL = 'https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_sub_cb=3|4|5|6|7|8|9|10&category_type_cb=2&locality_district_id=32&locality_region_id=7&per_page=100&tms=1624806458196'

const fetchFlats = async () => {
  const response = await requestGet(URL)

  return createFlatsFromArray(response?._embedded?.estates, (record) => {
    return {
      source: 'SREALITY',
      externalId: record.hash_id,
      url: `https://www.sreality.cz/detail/pronajem/byt/_/${record.seo.locality}/${record.hash_id}`,
      lng: record.gps.lon,
      lat: record.gps.lat,
      price: record.price,
      description: record.name,
      published: new Date(),
      photos: record._links.images.map((image: any) => ({url: image.href})),
    }
  })
}

export const sreality = async () => {
  logInfo('Fetching flats from sreality api')
  const flatsFromApi = await fetchFlats()
  logInfo(`Found ${flatsFromApi.length} offers in api`)
  logInfo('Finding sreality flats in db')
  const flatsFromDb = await findFlatsBySource('SREALITY')
  logInfo(`Found ${flatsFromDb.length} offers in db`)

  const {savedFlats} = await checkForNewFlats(flatsFromApi, flatsFromDb, async (flat) => {
    logInfo(`Found new offer id: ${flat.externalId}, url: ${flat.url}`)
    await saveFlat(flat)
  })

  logInfo(`Saved ${savedFlats} flats`)
}
