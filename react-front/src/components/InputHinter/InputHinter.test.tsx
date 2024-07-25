import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import InputHinter from './InputHinter';

describe('<InputHinter />', () => {
    test('it should render', () => {
        render(<InputHinter onChange=""/>);
        const hinter = screen.getByTestId('input-hinter');
        expect(hinter).toBeInTheDocument();
    });

  test('it has been touched', () => {

  });

  test('displays error based on password type', () => {

  });

  test('displays error based on email type', () => {

  });

  test('no errors rendering for valid input', () => {

  });
});