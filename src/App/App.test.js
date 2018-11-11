import {App} from './App';
import Enzyme, {shallow} from "enzyme";
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

describe('Tests button component',() => {

    const makeComponent = (loggedIn = false) => {
        return shallow(
            <App
                fetchNotificationsAction={() => {}}
                isLoggedIn={loggedIn}
                notifications={[]}
            />
        )
    };

    it('should render correctly',() => {
        expect(makeComponent()).toMatchSnapshot();
    });

});
