import {requestGet} from '../../lib'
import {createFlatsFromArray, saveNewFlats, findFlatsBySource} from '../../model'

const URL = 'https://www.byty.cz/json/json.aspx?a=search&z=14&c=775&adv=&t=2&ausr=0&com=0&o=0&p1=0&p2=0&lat_sw=50.009118045393635&lng_sw=15.687103271484377&lat_ne=50.05774493052071&lng_ne=15.849752426147463&area_lat=&area_lng=&area_r=&cnt=500'

const fetchFlatsFromApi = async () => {
  const response = await requestGet(URL)

  return createFlatsFromArray(response.data, (record => {
    const isDemand = (record.x === '50.0386' && record.y === '15.7791')

    return (!isDemand) ? {
      source: 'BYTY',
      offerType: 'RENT',
      externalId: record.id_ad,
      url: record.byty_url,
      lng: record.y,
      lat: record.x,
      price: record.ad_price,
      description: record.ad_head,
      published: new Date(),
      photos: [{
        url: record.ad_foto_url,
      }],
    } : null
  }))
}

const findFlatsBySourceInDb = () => findFlatsBySource('BYTY')

export const byty = () => saveNewFlats(fetchFlatsFromApi, findFlatsBySourceInDb)
