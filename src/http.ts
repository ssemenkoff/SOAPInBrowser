export async function request (url: string | URL, data: string | null, exheaders: any = {}): Promise<Response> {
  let fetchFunc
  try {
    fetchFunc = fetch
  } catch (e) {
    fetchFunc = require('cross-fetch')
  }

  const baseHeaders = {
    Accept: 'text/html,application/xhtml+xml,application/xml',
    'Content-Type': 'text/xml'
  }

  const request = await fetchFunc(url, {
    method: data ? 'POST' : 'GET',
    headers: {
      ...baseHeaders,
      ...exheaders
    },
    body: data
  })

  return request
}
