import { assert, expect, test } from 'vitest'
import { fetch } from 'cross-fetch'

// Edit an assertion and save to see HMR in action

test('Math.sqrt()', () => {
  expect(Math.sqrt(4)).toBe(2)
  expect(Math.sqrt(144)).toBe(12)
  expect(Math.sqrt(2)).toBe(Math.SQRT2)
})

test('JSON', async () => {
  const input = {
    foo: 'hello',
    bar: 'world',
  }

  const a = await fetch('https://jsonplaceholder.typicode.com/posts')
  const json = await a.json();

  const output = JSON.stringify(input)

  expect(json.length).gt(0);
})
