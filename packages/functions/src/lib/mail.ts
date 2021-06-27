import * as mailjet from 'node-mailjet'
import {config} from './config'

const client = mailjet.connect(config.MAILJET_API_KEY, config.MAILJET_API_SECRET)

export const sendMail = async (subject: string, content: string) => client
  .post('send', {version: 'v3.1'})
  .request({
    Messages: [
      {
        From: {
          Email: 'flat@krystof-matejka.com',
          Name: 'Kryštof',
        },
        To: [
          {
            Email: 'krystof.m.login@pm.me',
            Name: 'Kryštof',
          },
        ],
        Subject: subject,
        HTMLPart: content,
        CustomID: 'NewFlatFound',
      },
    ],
  })
