import { BasicAuthSecurity, createClient } from '../src/soap'
import { assert, expect, test } from 'vitest'

const clientPromise = createClient('http://127.0.0.1:8080/xmla.wsdl');


test('Encode credentials', () => {
  const a = new BasicAuthSecurity('Test', 'Test');

  const headers = {};

  a.addHeaders(headers);
  expect(headers['Authorization']).not.toBeUndefined();
})



test('Create client', async () => {
  const client = await clientPromise
  
  expect(client).toBeDefined()
})

test('Create session', async () => {
  const client = await clientPromise

  const createSessionResponce = await client.ExecuteAsync(
    {
      Headers: {
        BeginSession: {
          __attrs: {
            xmlns: "urn:schemas-microsoft-com:xml-analysis",
          },
        },
        Version: {},
      },
      Command: {
        Statement: {},
      },
      Properties: {
        PropertieList: {
          LocaleIdentifier: "1033",
        },
      },
    }
  )

  expect(createSessionResponce.Header.Session.__attrs.SessionId).toBeTypeOf('string')  
  assert(createSessionResponce.Header.Session.__attrs.SessionId)
})

test('Get catalogs', async () => {
  const client = await clientPromise

  const discoverDatasourcesResponce = await client.DiscoverAsync(
    {
      RequestType: "DISCOVER_DATASOURCES",
      Restrictions: "",
      Properties: "",
    }
  );

  expect(discoverDatasourcesResponce).toBeDefined()
})

test('Get cubes', async () => {
  const client = await clientPromise

  const discoverDatasourcesResponce = await client.DiscoverAsync({
    RequestType:'MDSCHEMA_CUBES',
    Restrictions:{} ,
    Properties:''
  });

  expect(discoverDatasourcesResponce).toBeDefined()
})