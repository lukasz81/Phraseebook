import {App} from './App';
import Enzyme, {shallow,mount} from "enzyme";
import React from 'react';
import {createStore} from 'redux';
import { appReducer } from '../Redux/reducers';
import {MemoryRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

const store = createStore(appReducer);

describe('Tests App component',() => {

    const routerComponent = (path) => {
        return mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[path]}>

                        <App
                            fetchNotificationsAction={() => {}}
                            notifications={[]}
                        />

                </MemoryRouter>
            </Provider>
        )
    };

    const makeComponent = () => {
        return shallow(
            <App
                fetchNotificationsAction={() => {}}
                notifications={[]}
            />
        )
    };

    it('should render correctly', () => {
        expect(makeComponent()).toMatchSnapshot();
    });

    it('should render home page', () => {
        const component = routerComponent('/');
        expect(component.find('.home-page').length > 0).toBe(true)
    });

    it('should render details page page', () => {
        const component = routerComponent('/notification/:20');
        expect(component.find('.details-page').length > 0).toBe(true)
    });

    it('should render notifications list page', () => {
        const component = routerComponent('/notifications');
        expect(component.find('.notifications-list').length > 0).toBe(true)
    });

    it('should produce html for home page', () => {
        const component = makeComponent();
        const content = component.instance().contentForHomePage();
        expect(content.props.className).toBe("default-padding home-page")
    });

    it('should produce html for details page', () => {
        const component = makeComponent();
        const props = {match:{params: {id: 22222}}};
        const content = component.instance().contentForDetailsPage(props);
        expect(content.props.className).toBe("default-padding details-page")
    });

});
