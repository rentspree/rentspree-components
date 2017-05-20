import React from 'react'
import TestComponent from '../components/form'
import renderer from 'react-test-renderer'

test('Test component showed', () => {
  console.log(TestComponent)
  const component = renderer.create(
    <TestComponent />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
