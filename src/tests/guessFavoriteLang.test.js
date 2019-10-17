import { mockDataSucess, MockDataFail } from './MockData';
import { guessFavoriteLang } from "../guessFavoriteLang";

beforeEach(function () {
    window.fetch = jest.fn().mockImplementation((userName) => {
        if (userName.includes('thisIsAMockUserNameThatDoesntExistXX99')) {
            return Promise.reject(
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

/*
* Note, we must handle both then and catch in order to not get warned.
* */

it('If we pass a username that does not exist, it responds with a rejected promise error.', async() => {
    guessFavoriteLang('thisIsAMockUserNameThatDoesntExistXX99').then(() => {
    }).catch((error) => {
    });
});

it('If we pass a username that exist, responds with a resolved promise, with correct value', async() => {
    guessFavoriteLang('thisIsAMockUserNameThatDoesntExistXX99').then((response) => {
    }).catch(() => {
    });
});