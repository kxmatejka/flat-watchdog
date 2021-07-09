import {sendMail} from '../../lib/mail'
import type {Flat} from '../flat'

export const sendNotificationEmail = (flat: Flat) => {
  const html =
`<p>description: ${flat.description}</p>
<p>price: ${flat.price.toLocaleString('cs-CZ')}</p>
<p><a href="${flat.url}">link</a></p>
`

  let subject = 'Found:'
  if (flat.description) {
    subject += `${flat.description}, `
  }
  if (flat.disposition) {
    subject += `D: ${flat.disposition}, `
  }
  if (flat.surface) {
    subject += `S: ${flat.surface}, `
  }

  return sendMail(subject.replace(/,\s$/, ''), html)
}
