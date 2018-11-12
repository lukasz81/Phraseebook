import React, {Component} from 'react';
import NotificationsList from '../NotificationsList/NotificationsList';
import NavBar from '../NavBar/NavBar';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';
import { MdHome, MdNotifications } from 'react-icons/md';
import {fetchNotificationsAction} from '../NotificationsList/notificationsActions';
const lorem = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'

export class App extends Component {

    componentWillMount() {
        // Load content if not in store.
        if (!this.props.notifications.length) this.props.fetchNotificationsAction()
    }

    contentForDetailsPage(props) {
        return (
            <div className={'default-padding details-page'}>
                <h3><MdNotifications size={20}/> Notification</h3>
                <p>Notification content for post: {props.match.params.id}</p>
            </div>
        )
    };

    contentForHomePage() {
        return (
            <div className={'default-padding home-page'}>
                <h3><MdHome size={20}/> Home</h3>
                <p>{lorem}</p>
            </div>
        )
    };

    render() {
        const {history} = this.props;
        return (
            <div className="App">
                <NavBar history={history} props={this.props}/>
                <main className={'full-height bg-white default-width'}>
                    <Switch>
                        <Route history={history} exact path="/" render={() => this.contentForHomePage()}/>
                        <Route history={history} path="/notifications" component={NotificationsList}/>
                        <Route history={history} path='/notification/:id' render={ props => this.contentForDetailsPage(props)}/>
                    </Switch>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isWaiting: state.isWaiting,
        notifications: state.notifications
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