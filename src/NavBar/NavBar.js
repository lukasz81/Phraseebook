import React from 'react';
import './NavBar.css';
import { MdNotifications } from 'react-icons/md';
import {withRouter} from 'react-router-dom';

const NavBar = (props) => {

    const notificationsPath = props.location.pathname === '/notifications';

    const onClickHandler = () => {
        props.history.push('/notifications')
    };

    const goHomeHandler = () => {
        props.history.push('/')
    };

    return (
        <nav className={'flex-container'}>
            <div className={'flex-container flex-row notification-wrapper'}>
                <div onClick={() => goHomeHandler()} className={'default-padding button-1'}>
                    <b>Phrasebook</b>
                </div>
                <div className={notificationsPath ? 'notification-actions flex-container active' : 'notification-actions flex-container' } onClick={() => onClickHandler()}>
                    <MdNotifications size={30}/>
                    {(!props.props.isNotificationRead && props.props.notifications) && <span className={'notifications-count'}>{props.props.notifications ? props.props.notifications.length : '...'}</span>}
                </div>
            </div>
        </nav>
    );
};

export default withRouter(NavBar);