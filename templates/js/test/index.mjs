/* eslint-disable import/no-absolute-path */
import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

group('Self tests', () => {
  test('Test "toEqual()": 1 === 1', () => {
    expect(1).toEqual(1)
  })
})
