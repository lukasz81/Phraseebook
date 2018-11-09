import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTrackersAction} from './fetchNotificationsActions';
import './NotificationsList.css';

export class NotificationsList extends Component {

    componentWillMount() {
        // Load content if not in store.
        if (!this.props.notifications) this.props.fetchTrackersAction()
    }

    trackerClickHandler(event, id) {
        event.preventDefault();
        this.props.history.push('/notification/' + id)
    }

    createCopyForNotifications(notification) {
        const notificationTypeIsLike = notification.type === 'Like';
        const source = notificationTypeIsLike ? notification.likes : notification.comments;
        const maxNames = 2;
        const names = source.map(
            (item, index) => index < maxNames ? ` ${item.name}` : null
        );
        const trimmedBase = `${names}`.replace(/([,\s]+$)/g, '');
        const action = notificationTypeIsLike ? 'liked' : 'commented on';
        const multipleActionCopy =
            <span className={'two-line-text'}>
                <b>{trimmedBase} and {source.length - maxNames} others</b> {action} your post: "{notification.post.title}."
            </span>;
        const singleActionCopy =
            <span className={'two-line-text'}>
                {console.log(names[0] === " ")}
                <b>{names.length && !notificationTypeIsLike ? names : 'User'}</b> {action} your post: "{notification.post.title}."
            </span>;
        return source.length > 1 ? multipleActionCopy : singleActionCopy;

    }

    createListOfNotifications(notifications) {
        return notifications.map((notification, index) => {
                return (
                        <li
                            onClick={event => this.trackerClickHandler(event, notification.post.id)}
                            className={'flex-container notification-container'}
                            key={index}>
                            <img className={'profile-picture'} src={'/img-placement.jpg'}
                                 alt={'Profile picture for ' + notification.type}/>
                            {this.createCopyForNotifications(notification)}
                        </li>
                )
            }
        )
    }

    render() {
        const notifications = this.props.notifications;
        return (
            <div className={'default-padding'}>
                {notifications ?
                    <div className={'notification-container'}>
                        <ul>
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