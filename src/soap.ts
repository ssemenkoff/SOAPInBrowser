import { Client } from './client'
import { openWSDL } from './wsdl'
// import crypto from "crypto";

type WSDL = any

const _cache: Record<string, unknown> = {}

async function _requestWSDL (url: string, options: any = {}): Promise<WSDL> {
  const cachedVal = _cache[url]

  if (cachedVal) return cachedVal

  return await openWSDL(url, options)
}

export async function createClient (
  url: string,
  options: any = {}
): Promise<Client> {
  const wsdl = await _requestWSDL(url, options)
  return new Client(wsdl, options.endpoint)
}

export class BasicAuthSecurity {
  private readonly _username: string
  private readonly _password: string

  constructor (username: string, password: string) {
    this._username = username
    this._password = password
  }

  public addHeaders (headers: Record<string, string>): void {
    const bufferedCreds = Buffer.from(
      `${this._username}:${this._password}`,
      'base64'
    ).toString('binary')
    headers.Authorization = `Basic ${bufferedCreds}`
  }

  public toXML (): string {
    return ''
  }
}

export class WSSecurity {
  private readonly inited: boolean = false
  constructor () {
    throw new Error('Not implemented yet')
  }
}
