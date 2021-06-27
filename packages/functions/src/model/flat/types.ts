import * as yup from 'yup'
import type {Asserts} from 'yup'

const photo = yup.object().shape({
  url: yup.string(),
})

const SUPPORTED_SOURCES = ['ULOVDOMOV', 'BEZREALITKY', 'SREALITY', 'BYTY'] as const
export type SupportedSource = typeof SUPPORTED_SOURCES[number]

export const flat = yup.object().shape({
  externalId: yup.string().required(),
  url: yup.string().required(),
  description: yup.string().defined(),
  lng: yup.number().required(),
  lat: yup.number().required(),
  price: yup.number().required(),
  found: yup.date(),
  published: yup.date().required(),
  source: yup.mixed().oneOf([...SUPPORTED_SOURCES]).required(),
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
