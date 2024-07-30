import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import InputHinter from './InputHinter';
import userEvent from "@testing-library/user-event";
import exp from "node:constants";

describe('<InputHinter />', () => {
    test('it should render', () => {
        render(<InputHinter/>);
        const hinter = screen.getByTestId('input-hinter');
        expect(hinter).toBeInTheDocument();
    });

  test('it has been touched', async () => {
      //if touched - would expect it to have a required error
      render(<InputHinter name="Email Address" type="email"/>);
      const hinterInput = screen.getByTestId('hinter-input');
      const wrongEmailMessage = "Email Address is Required";

      userEvent.click(hinterInput);
      userEvent.click(await screen.findByText("Email Address"));



      expect(screen.getByText(wrongEmailMessage)).toBeInTheDocument();

     // expect(hinterInput).toBeInTheDocument();
  });

  test('displays error based on email type', () => {

  });

  test('no errors rendering for valid input', () => {

  });

    test('displays error based on password type', () => {

    });
});