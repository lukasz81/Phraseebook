import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTrackersAction} from './fetchNotificationsActions';
import './NotificationsList.css';

export class NotificationsList extends Component {

    componentWillMount() {
        if (!this.props.notifications) this.props.fetchTrackersAction()
    }

    trackerClickHandler(event, id) {
        event.preventDefault();
        this.props.history.push('/notification/' + id)
    }

    createCopyForNotifications(notification) {
        const maxNames = 2;
        const baseCopy =  notification.likes.map(
            (like,index) => index < maxNames ? ` ${like.name}` : null
        );
        const trimmedBase = `${baseCopy}`.replace(/([,\s]+$)/g, '');
        const multipleActionCopy =
            <span>
                <b>{trimmedBase} and {notification.likes.length - maxNames} others</b> liked your post: "{notification.post.title}."
            </span>;
        const singleActionCopy =
            <span>
                <b>{baseCopy.length > 1 ? baseCopy: 'User'}</b> likes your post: "{notification.post.title}."
            </span>;
        return notification.likes.length > 1 ?  multipleActionCopy : singleActionCopy;

    }

    createListOfNotifications(notifications) {
        return notifications.map((notification, index) => {
                return (
                    <React.Fragment>
                            {notification.type === 'Like' ? (
                                <li
                                    onClick={event => this.trackerClickHandler(event, notification.id)}
                                    className={'bg-transparent'}
                                    key={index}>
                                    <img className={'profile-picture'} src={'/img-placement.jpg'} alt={notification.type}/>
                                    {this.createCopyForNotifications(notification)}
                                </li>
                            ):null}
                    </React.Fragment>
                )
            }
        )
    }

    render() {
        const notifications = this.props.notifications;
        return (
                <div className={''}>
                    {notifications ?
                        <div className={'notification-container'}>
                            <ul className={'flex-container'}>
                                {this.createListOfNotifications(notifications)}
                            </ul>
                        </div>
                        :
                        <p>Loading notifications ...</p>
                    }
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTrackersAction: () => {
            fetchTrackersAction(dispatch)
        }
    }
};

const mapStateToProps = (state) => {
    return {
        isWaiting: state.isWaiting,
        notifications: state.notifications
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList);