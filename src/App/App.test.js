import {App} from './App';
import Enzyme, {shallow} from "enzyme";
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

describe('Tests button component',() => {

    const makeComponent = (loggedIn = false) => {
        return shallow(<App isLoggedIn={loggedIn}/>)
    };


    it('should render correctly',() => {
        expect(makeComponent()).toMatchSnapshot();
    });

    // it('should render "Login" component if not logged in',() => {
    //     const component = makeComponent();
    //     expect(component.find('Connect(Login)').length > 0).toBe(true);
    // });
    //
    // it('should not render "Login" component if logged in',() => {
    //     const component = makeComponent(true);
    //     expect(component.find('Connect(Login)').length === 0).toBe(true);
    // });

});
