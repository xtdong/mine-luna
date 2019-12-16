import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAxios from 'jest-mock-axios';

import ProductListing from '../ProductListing/ProductListing';
import Spinner from '../../components/UI/Spinner/Spinner';
import ProductListItem from '../../components/ProductListItem/ProductListItem';

configure({ adapter: new Adapter });

beforeAll(() => {
    global.fetch = jest.fn();
    //window.fetch = jest.fn(); if running browser environment
});

let wrapper;
beforeEach(() => {
    wrapper = shallow(<ProductListing />, { disableLifecycleMethods: true });
});
afterEach(() => {
    wrapper.unmount();
    mockAxios.reset();
});

it("must render a loading span before api call success", () => {
    expect(wrapper.find(Spinner).exists()).toBeTruthy();
});

it("must show the ProductListItem and hide the loading span after api call success",
    (done) => {
        // here we are spying on componentDidMount to know that it has been called
        const spyDidMount = jest.spyOn(ProductListing.prototype, "componentDidMount");

        const didMount = wrapper.instance().componentDidMount();

        let responseObj = {
            'data': {
                'products': [
                    {
                        'uuid': '1',
                        'name': 'chair',
                        'photos': [
                            {
                                'url': 'test_url'
                            }
                        ]
                    }
                ]
            }
        };
        mockAxios.mockResponse(responseObj);

        // expecting componentDidMount have been called
        expect(spyDidMount).toHaveBeenCalled();
        didMount.then(() => {
            // updating the wrapper
            wrapper.update();
            expect(wrapper.find(ProductListItem).exists()).toBeTruthy();
            spyDidMount.mockRestore();
            fetch.mockClear();
            done();
        });
    });