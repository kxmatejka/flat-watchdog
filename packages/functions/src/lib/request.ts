import fetch from 'node-fetch'

export const requestPost = async (url: string, params?: any) => {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  return result.json()
}
