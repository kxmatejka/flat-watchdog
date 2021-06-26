import {functions} from '../../lib'
import {ulovdomov} from '../../scrapers/ulovdomov'

export const scrapeUlovDomovEachHour = functions().pubsub.schedule('0 * * * *').onRun(() => ulovdomov())
