import React from 'react';
import './NavBar.css';
import { MdNotifications } from 'react-icons/md';
import {withRouter} from 'react-router-dom';

const NavBar = (props) => {

    const isNotificationsPath = props.location.pathname === '/notifications';

    const onClickHandler = () => {
        props.history.push('/notifications')
    };

    const goHomeHandler = () => {
        props.history.push('/')
    };

    const areAllNotificationsRead = () => {
        const notifications = props.props.notifications;
        return notifications.reduce(
            (accumulator, currentValue) => {
                return currentValue && currentValue.isRead
            },false
        );
    };

    return (
        <nav className={'flex-container'}>
            <div className={'flex-container space-between default-width notification-wrapper'}>
                <div onClick={() => goHomeHandler()} className={'default-padding button-1'}>
                    <b>Phrasebook</b>
                </div>
                <div className={isNotificationsPath ? 'notification-actions flex-container active' : 'notification-actions flex-container' } onClick={() => onClickHandler()}>
                    <MdNotifications size={30}/>
                    {(!areAllNotificationsRead() && !isNotificationsPath) && <span className={'notifications-count'}>{props.props.notifications.length}</span>}
                </div>
            </div>
        </nav>
    );
};

export default withRouter(NavBar);