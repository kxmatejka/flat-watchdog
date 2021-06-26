import * as yup from 'yup'
import type {Asserts} from 'yup'

const photo = yup.object().shape({
  url: yup.string(),
})

const SUPPORTED_SOURCES = ['ULOVDOMOV']

export const flat = yup.object().shape({
  externalId: yup.string().required(),
  url: yup.string().required(),
  description: yup.string().required(),
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
