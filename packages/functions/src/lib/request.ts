import fetch from 'node-fetch'

export const postJson = async (url: string, params?: any) => {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  return result.json()
}

export  const postFormData = async (url: string, body?: string) => {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  return result.json()
}
