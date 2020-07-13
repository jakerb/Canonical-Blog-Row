import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<BlogPosts />);
  const linkElement = getByText(/Article/i);
  expect(linkElement).toBeInTheDocument();
});
