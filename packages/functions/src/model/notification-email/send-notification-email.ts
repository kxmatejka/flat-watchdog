import {sendMail} from '../../lib/mail'
import type {Flat} from '../flat'

export const sendNotificationEmail = (flat: Flat) => {
  const html =
`<p>description: ${flat.description}</p>
<p>price: ${flat.price.toLocaleString('cs-CZ')}</p>
<p><a href="${flat.url}">link</a></p>
`

  return sendMail('New apartment found', html)
}
