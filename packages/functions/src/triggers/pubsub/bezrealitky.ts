import {functions} from '../../lib'
import {bezrealitky} from '../../scrapers'

export const scrapeBezrealitkyEachHour = functions().pubsub.schedule('0 * * * *').onRun(() => bezrealitky())
