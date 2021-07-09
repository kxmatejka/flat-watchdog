import * as yup from 'yup'
import type {Asserts} from 'yup'

const photo = yup.object().shape({
  url: yup.string(),
})

const SUPPORTED_SOURCES = ['ULOVDOMOV', 'BEZREALITKY', 'SREALITY', 'BYTY'] as const
export type SupportedSource = typeof SUPPORTED_SOURCES[number]

export enum DISPOSITIONS {
  ROOM = 'ROOM',
  STUDIO = 'STUDIO',
  '1+kk' = '1+kk',
  '1+1' = '1+1',
  '2+kk' = '2+kk',
  '2+1'= '2+1',
  '3+kk' = '3+kk',
  '3+1' = '3+1',
  '4+kk' = '4+kk',
  '4+1' = '4+1',
  '5+' = '5+',
  HOUSE = 'HOUSE',
  ATYPICAL = 'ATYPICAL',
}

const OFFER_TYPES = ['RENT', 'SALE'] as const

export const flat = yup.object().shape({
  externalId: yup.string().required(),
  url: yup.string().required(),
  description: yup.string().defined(),
  lng: yup.number().required(),
  lat: yup.number().required(),
  price: yup.number().required(),
  surface: yup.number(),
  found: yup.date(),
  published: yup.date().required(),
  source: yup.string().oneOf([...SUPPORTED_SOURCES]).required(),
  disposition: yup.string().oneOf([
    DISPOSITIONS.ROOM, DISPOSITIONS.STUDIO, DISPOSITIONS['1+kk'], DISPOSITIONS['1+1'], DISPOSITIONS['2+kk'],
    DISPOSITIONS['2+1'], DISPOSITIONS['3+kk'], DISPOSITIONS['3+1'], DISPOSITIONS['4+kk'], DISPOSITIONS['4+1'],
    DISPOSITIONS['5+'], DISPOSITIONS.HOUSE, DISPOSITIONS.ATYPICAL,
  ]),
  offerType: yup.string().oneOf([...OFFER_TYPES]).required(),
  photos: yup.array().of(photo),
})

export const flats = yup.array().of(flat)

export type Flat = Asserts<typeof flat>

export const createFlatsFromArray = (data: any[], parse: (record: any) => any) => {
  const parsedRecords: any[] = []
  data.forEach((record) => {
    const parsedRecord = parse(record)
    if (parsedRecord) {
      parsedRecords.push(parsedRecord)
    }
  })

  const result = flats.validateSync(parsedRecords)

  return (result) ? result : []
}
