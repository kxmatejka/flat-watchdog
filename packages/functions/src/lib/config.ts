import * as dotenv from 'dotenv'
import {config as configType} from '../model'

dotenv.config()

const parseConfig = () => configType.validateSync({
  MAILJET_API_KEY: process.env.MAILJET_API_KEY,
  MAILJET_API_SECRET: process.env.MAILJET_API_SECRET,
})

export const config = parseConfig()
