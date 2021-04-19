import "./App.css";

// react guardedRoute
import { GuardedRoute } from "react-router-guards";

// route component
import Test from "./components/Test";
import Test2 from "./components/Test2";
import Login from "./containers/Login/Login";

import Home from './containers/Home/HOME';

import Header from '../src/components/Header/Header';
import Register from '../src/containers/Register/Register';

import LoadmoreDemo from "./containers/LoadmoreDemo/LoadmoreDemo";

import RequireVerifyEmail from "./components/RequireVerifyEmail/RequireVerifyEmail";

//ck editor
// import CKEditorCustom from './components/CKEditorCustom/CKEditorCustom';
import CreatePost from "./containers/CreatePost/index";

import { Switch } from "react-router-dom";

//ck editor
//ck editor 


import { BrowserRouter as Router, Route } from "react-router-dom";

import { Button, Grid } from "@material-ui/core";
import TopMenu from "./components/TopMenu";
import Dashboard from "./components/Dashboard";
import URLRouter from "./components/URLRouter";
import PostDetails from "./containers/PostDetails";
import Content from "./containers/NewsFeed/Content";
import Test1 from "./components/Test1";

function App() {
  return (
    <Router>
      <div className="App">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}></Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}></Grid>

            <Grid item xs={12} md={4}>
              <Link to="/1">
                <Button>Home</Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
          <Switch>
            <GuardedRoute
              path="/1"
              exact
              component={Test}
              meta={{ auth: true }}
            />
            <GuardedRoute
              path="/2"
              exact
              component={Test2}
              meta={{ auth: false }}
            />
            <GuardedRoute
              path="/login"
              exact
              component={Login}
              meta={{ auth: true }}
            />
            <GuardedRoute
              path="/editor"
              exact
              component={CreatePost}
              meta={{ auth: true }}
            />
            <GuardedRoute
              path="/post/:id"
              exact
              component={PostDetails}
            />
            <GuardedRoute
              path="/tuanthanh"
              exact
              component={Content}
            />
          </Switch>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
        {/* <TopMenu />
        <div style={{ backgroundColor: "rgb(238,240,241)" }}>
          <URLRouter />
        </div> */}

        {/* <Switch>

          <GuardedRoute path="/1" exact component={Test} meta={{auth : true}}/>
          <GuardedRoute path="/2" exact component={Test2} meta={{auth : false}}/>
          <GuardedRoute path="/login" exact component={Login} meta={{auth : true}}/>
          <GuardedRoute path="/editor" exact component={CKEditorCustom} meta={{auth : true}}/>
          
      </Switch>  */}
      </div>
    </Router>
  );
function App() {
    return (

        <Switch>
            <GuardedRoute path="/1" exact component={Test} meta={{auth: true}}/>
            <GuardedRoute
                path="/2"
                exact
                component={Test2}
                meta={{auth: false}}
            />
            <GuardedRoute
                path="/login"
                exact
                component={Login}
                meta={{auth: true}}
            />
            <GuardedRoute
                path="/editor"
                exact
                component={CreatePost}
                meta={{auth: true}}
            />

            <GuardedRoute
                path="/header"
                exact
                component={Header}
                meta={{auth: false}}
            />

            <GuardedRoute
                path="/register"
                exact
                component={Register}
                meta={{auth: false}}
            />
                <GuardedRoute
                    path="/loadmore"
                    exact
                    component={LoadmoreDemo}
                    meta={{auth: false}}
                />

            <GuardedRoute
                path="/email"
                exact
                component={RequireVerifyEmail}
                meta={{auth: false}}
            />

            <GuardedRoute
                path="/home"
                exact
                component={Home}
                meta={{auth: true}}
            />

        </Switch>)


}

export default App;
