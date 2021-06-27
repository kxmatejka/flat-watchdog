import * as yup from 'yup'
import type {Asserts} from 'yup'

const photo = yup.object().shape({
  url: yup.string(),
})

const SUPPORTED_SOURCES = ['ULOVDOMOV', 'BEZREALITKY', 'SREALITY']
const SUPPORTED_SOURCES_AS_CONST = ['ULOVDOMOV', 'BEZREALITKY', 'SREALITY'] as const
export type SupportedSource = typeof SUPPORTED_SOURCES_AS_CONST[number]

export const flat = yup.object().shape({
  externalId: yup.string().required(),
  url: yup.string().required(),
  description: yup.string().defined(),
  lng: yup.number().required(),
  lat: yup.number().required(),
  price: yup.number().required(),
  found: yup.date(),
  published: yup.date().required(),
  source: yup.mixed().oneOf(SUPPORTED_SOURCES).required(),
  photos: yup.array().of(photo),
})

export const flats = yup.array().of(flat)

export type Flat = Asserts<typeof flat>

export const createFlatsFromArray = (data: any[], parse: (record: any) => any) => {
  const result = flats.validateSync(data.map((record) => parse(record)))

  return (result) ? result : []
}
