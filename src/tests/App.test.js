import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { mockDataSucess, MockDataFail } from './MockData';
import {render,  waitForElement, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

beforeEach(function () {
  window.fetch = jest.fn().mockImplementation((userName) => {
    if (userName.includes('thisIsAMockUserNameThatDoesntExistXX99')) {
      return Promise.resolve(
          {
            json: () => Promise.resolve(MockDataFail)
          })
    }
    else {
      return Promise.resolve(
          {
            json: () => Promise.resolve(mockDataSucess)
          })
    }
  })
});

it('Integration-test: Search for an existing user, gives a best guess', async() => {
  const { getByTestId, getByText } = render(<App />);
  fireEvent.change(getByTestId("search-testid"), {target: {value: 'frejp'}})
  fireEvent.click(getByText("Search"));
  await waitForElement(
      () => getByTestId("result-testid"));
  expect(getByTestId("result-testid")).toHaveTextContent('JavaScript');
});

it('Integration-test: Search for a non existant user, gives correct error text', async() => {
  const {  getByTestId, getByText } = render(<App />);
  fireEvent.change(getByTestId("search-testid"), {target: {value: 'thisIsAMockUserNameThatDoesntExistXX99'}});
  fireEvent.click(getByText("Search"));
  await waitForElement(
      () => getByTestId("result-testid"));
  expect(getByTestId("result-testid")).toHaveTextContent('No repositories for that user');
});



