import {requestGet} from '../../lib'
import {createFlatsFromArray, findFlatsBySource, saveNewFlats} from '../../model'

const URL = 'https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_sub_cb=3|4|5|6|7|8|9|10&category_type_cb=2&locality_district_id=32&locality_region_id=7&per_page=100&tms=1624806458196'

const fetchFlatsFromApi = async () => {
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

const findFlatsBySourceInDb = () => findFlatsBySource('SREALITY')

export const sreality = () => saveNewFlats(fetchFlatsFromApi, findFlatsBySourceInDb)
