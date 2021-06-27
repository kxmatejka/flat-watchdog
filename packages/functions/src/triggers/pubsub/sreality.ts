import {functions} from '../../lib'
import {sreality} from '../../scrapers'

export const scrapeSrealityEachHour = functions().pubsub.schedule('0 * * * *').onRun(() => sreality())
