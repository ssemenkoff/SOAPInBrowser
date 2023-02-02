import { fetch } from 'cross-fetch'

export async function request (url: string | URL, data: string | null, exheaders: any = {}): Promise<Response> {
  const baseHeaders = {
    Accept: 'text/html,application/xhtml+xml,application/xml',
    'Content-Type': 'text/xml'
  }

  const request = await fetch(url, {
    method: data ? 'POST' : 'GET',
    headers: {
      ...baseHeaders,
      ...exheaders
    },
    body: data
  })

  return request
}
