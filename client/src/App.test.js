import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('render site title', () => {
	const { getByText } = render(<App />);
	const titleElement = getByText(/Calen/i);
	expect(titleElement).toBeInTheDocument();
});
