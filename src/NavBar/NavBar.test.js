import NavBar from './NavBar';
import Enzyme, {shallow} from "enzyme";
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

describe('Tests button component',() => {

    let historyMock;
    let mock = jest.fn();
    historyMock = { push: mock };

    const makeComponent = (isNotificationRead = false) => {
        return shallow(
            <NavBar.WrappedComponent
                location={{pathname: '/'}}
                history={historyMock}
                props={{props:{
                        isNotificationRead: isNotificationRead,
                        notifications: ['6']
                    }}}
            />
        )
    };

    afterEach(() => {
        mock.mockRestore();
    });

    it('should render correctly',() => {
        expect(makeComponent()).toMatchSnapshot();
    });

    it('should update history location to "/"',() => {
        const component = makeComponent();
        const element = component.find('.button-1');
        element.simulate('click');
        expect(historyMock.push.mock.calls[0]).toEqual([ ('/') ]);
    });

    it('should update history location to "/notifications"',() => {
        const component = makeComponent();
        const element = component.find('.notification-actions');
        element.simulate('click');
        expect(historyMock.push.mock.calls[0]).toEqual([ ('/notifications') ]);
    });

    it('should not show count if marked as read',() => {
        const component = makeComponent(true);
        const element = component.find('.notifications-count');
        expect(element.length).toEqual(0);
    });

});
