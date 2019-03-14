import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth from './Auth';

class Callback extends Component {
    async componentDidMount() {
        await auth.handleAuthentication();
        this.props.history.replace('/');
    }

    render() {
        return (
            <div style={style}>
                Loading...
            </div>
        );
    }
}

export default withRouter(Callback);