import React, {Component} from 'react';
import NotificationsList from '../NotificationsList/NotificationsList';
import NavBar from '../NavBar/NavBar'
import './App.css';
import {Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';
import createHistory from "history/createBrowserHistory";

const history = createHistory();

export class App extends Component {

    render() {
        const {isLoggedIn} = this.props;
        return (
            <div className="App">
                <NavBar/>
                {isLoggedIn ? (
                    <Switch>
                        <Route history={history} exact path="/" component={NotificationsList}/>
                        <Route path='/notification/:index' render={(props) => {return <p>Notification content for {props.match.params.index}</p>}}/>
                    </Switch>
                ) : (<p>Login page</p>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        isWaiting: state.isWaiting
    }
};

export default connect(mapStateToProps)(App);