import {functions} from '../../lib'
import {ulovdomov} from '../../scrapers'

export const scrapeUlovDomovEachHour = functions().pubsub.schedule('0 * * * *').onRun(() => ulovdomov())
