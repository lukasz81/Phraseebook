import React, {Component} from 'react';
import NotificationsList from '../NotificationsList/NotificationsList';
import NavBar from '../NavBar/NavBar';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';
import { MdHome, MdNotifications } from 'react-icons/md';
import {fetchNotificationsAction} from '../NotificationsList/fetchNotificationsActions';
const lorem = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'

export class App extends Component {

    componentWillMount() {
        // Load content if not in store.
        if (!this.props.notifications) this.props.fetchNotificationsAction()
    }

    render() {
        const {isLoggedIn,history} = this.props;
        return (
            <div className="App">
                <NavBar history={history} props={this.props}/>
                {isLoggedIn ? (
                    <Switch>
                        <Route history={history} exact path="/" render={() => {
                            return (
                                <div className={'default-padding'}>
                                    <h3><MdHome size={20}/> Home</h3>
                                    <p>{lorem}</p>
                                </div>
                            )
                        }}/>
                        <Route history={history} path="/notifications" component={NotificationsList}/>
                        <Route history={history} path='/notification/:id' render={(props) => {
                            return (
                                <div className={'default-padding'}>
                                    <h3><MdNotifications size={20}/> Notification</h3>
                                    <p>Notification content for post: {props.match.params.id}</p>
                                </div>
                            )}}/>
                    </Switch>
                ) : (<p>Login page</p>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        isWaiting: state.isWaiting,
        notifications: state.notifications,
        isNotificationRead: state.isNotificationRead
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotificationsAction: () => {
            fetchNotificationsAction(dispatch)
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(App);