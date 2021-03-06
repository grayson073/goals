import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import Header from './Header';
import Home from './Home';
import Auth from '../auth/Auth';
import Goals from '../goals/Goals';
import { tryLoadUser } from '../auth/actions';
import { getCheckedAuth } from '../auth/reducers';
import styles from './App.css';

class App extends PureComponent {

  static propTypes = {
    tryLoadUser: PropTypes.func.isRequired,
    checkedAuth: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.tryLoadUser();
  }

  render() {
    const { checkedAuth } = this.props;

    return (
      <Router>
        <div className={styles.app}>
          <Header/>
          {checkedAuth &&
          <main>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/auth" component={Auth}/>
              <PrivateRoute path="/goals" component={Goals}/>
              <Redirect to="/"/>
            </Switch>
          </main>
          }
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({ checkedAuth: getCheckedAuth(state) }),
  { tryLoadUser }
)(App);