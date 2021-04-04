import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Content from './Content';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import News from './News';
import NewsDashboard from './NewsDashboard';

class URLRouter extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/post">
                        <div className="container d-flex">
                            <NewsDashboard/>
                            <News />
                        </div>
                    </Route>
                    <Route path="/">
                        <div className="container d-flex">
                            <Dashboard/>
                            <div className="container row col-sm-8 mb-5">
                            <Content/>
                            <Content/>
                            <Content/>
                            </div>
                        </div>
                    </Route>
                    <Route path="/feed">
                        <News />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default URLRouter;