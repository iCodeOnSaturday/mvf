import React from 'react';
import SearchCard from '../SearchCard';
import {render,  waitForElement, fireEvent, act} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

function mockFunction(userName) {
    return {
        guessFavoriteLang: jest.fn((userName) => {
            if (userName === 'thisIsAMockUserNameThatDoesntExistXX99') {
                return Promise.reject('No repositories for that user')
            }
            else {
                return Promise.resolve('JavaScript')
            }
        })
    }
}

jest.mock('../guessFavoriteLang', (userName) => mockFunction(userName));

it('Type in name and search, the spinner will load and show loading text', async() => {
    const { getByTestId, getByText } = render(<SearchCard />)
    fireEvent.change(getByTestId("search-testid"), {target: {value: 'testing-spinner'}});
    fireEvent.click(getByText("Search"));
    await act(async() => {
        expect(getByTestId("spinner-testid")).toBeDefined()
        expect(getByText("Loading")).toBeDefined()
    })
});

it('Type in name and search it will show correct message if guessFavoriteLang function is resolved', async() => {
    const { getByTestId, getByText } = render(<SearchCard />);
    fireEvent.change(getByTestId("search-testid"), {target: {value: 'frejp'}});
    fireEvent.click(getByText("Search"));
    await waitForElement(
        () => getByTestId("result-testid"));
    expect(getByTestId("result-testid")).toHaveTextContent('JavaScript');
});

it('Type in name and search it will show correct message if guessFavoriteLang function is rejected', async() => {
    const { getByTestId, getByText } = render(<SearchCard />);
    fireEvent.change(getByTestId("search-testid"), {target: {value: 'thisIsAMockUserNameThatDoesntExistXX99'}});
    fireEvent.click(getByText("Search"));
    await waitForElement(
        () => getByTestId("result-testid"));
    expect(getByTestId("result-testid")).toHaveTextContent('No repositories for that user');
});