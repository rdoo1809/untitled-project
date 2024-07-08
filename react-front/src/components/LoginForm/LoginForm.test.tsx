import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';

// describe('<LoginForm />', () => {
//   test('it should mount', () => {
//     render(<LoginForm />);
//
//     const LoginForm = screen.getByTestId('LoginForm');
//
//     expect(LoginForm).toBeInTheDocument();
//   });
// });