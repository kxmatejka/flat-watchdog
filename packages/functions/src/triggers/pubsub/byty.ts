import {functions} from '../../lib'
import {byty} from '../../scrapers'

export const scrapeBytyEachHour = functions().pubsub.schedule('0 * * * *').onRun(() => byty())
