import * as yup from 'yup'

export const config = yup.object().shape({
  MAILJET_API_KEY: yup.string().required(),
  MAILJET_API_SECRET: yup.string().required(),
  MAIL1: yup.string().required(),
  MAIL2: yup.string().required(),
})
