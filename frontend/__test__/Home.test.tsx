/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import  App  from '../src/App'

it('Should render hello text', () => {
  render(<App />)
  expect(screen.getByText('')).toBeInTheDocument()
})
