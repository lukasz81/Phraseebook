import NotificationsList from './notificationsList';
import Enzyme, {shallow} from "enzyme";
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

describe('Tests notifications list component', () => {

    const Comment = {
        type: 'Comment',
        post: {
            id: 'b1638f970c3ddd528671df76c4dcf13e',
            title: 'Acme Inc dynamically scales niches worldwide'
        },
        comments: [
            {
                id: '5497afbf9df3f6ff6f9ba11cdef5310f',
                name: 'Suoma Narjus',
                commentText: 'Acme remains one of my fave company ever! The way they scale is so dynamic that makes HTML5 look static!'
            }
        ],
        isRead: true
    };

    const Like = {
        type: 'Like',
        post: {
            id: 'b1638f970c3ddd528671df76c4dcf13e',
            title: 'Acme Inc dynamically scales niches worldwide'
        },
        likes: [
            {
                id: '403f220c3d413fe9cb0b36142ebfb35d',
                name: 'Mary T. Price'
            },
            {
                id: '5497afbf9df3f6ff6f9ba11cdef5310f',
                name: 'Suoma Narjus'
            },
            {
                id: 'fa527981cbbcb070be95854985c3188f',
                name: 'Sandra Ortega'
            },
            {
                id: '4c18d43d4deccbac21a26c55f1033f53',
                name: 'William Hunt'
            },
            {
                id: '38be3079117301f2f61264d6e0fbf7db',
                name: 'An Mao'
            }
        ],
        isRead: true
    };

    const mockFuncFetchNotifications = jest.fn();
    const mockFuncMarkAsRead = jest.fn();
    const pushMock = jest.fn();
    const historyMock = { push: pushMock };

    const makeComponent = (likeObject = Like, commentObject = Comment) => {
        return shallow(
            <NotificationsList.WrappedComponent
                history={historyMock}
                notifications={[likeObject,commentObject]}
                fetchNotificationsAction={mockFuncFetchNotifications}
                markAsRead={mockFuncMarkAsRead}
            />
        )
    };

    it('should render correctly', () => {
        expect(makeComponent()).toMatchSnapshot();
    });

    it('should call componentWillMount and call through dependent functions', () => {
        expect(mockFuncFetchNotifications).toHaveBeenCalledTimes(0);
        expect(mockFuncMarkAsRead).toHaveBeenCalledTimes(1);
    });

    it('should call prevent default when calling notificationClickHandler', () => {
        const mockPrevent = jest.fn();
        const event = {
            preventDefault: mockPrevent
        };
        const component = makeComponent();
        component.instance().notificationClickHandler(event,'123');
        expect(mockPrevent).toHaveBeenCalledTimes(1);
    });

    it('should call history push when calling notificationClickHandler', () => {
        const event = {
            preventDefault: jest.fn()
        };
        const component = makeComponent();
        component.instance().notificationClickHandler(event,'123');
        expect(pushMock).toHaveBeenCalled();
        expect(historyMock.push.mock.calls[0]).toEqual(['/notification/123']);
    });

    it('should create list of notifications', () => {
        const component = makeComponent();
        component.instance().createListOfNotifications([Like,Comment]);
        expect(component.find('li').length > 0).toBe(true)
    });



});