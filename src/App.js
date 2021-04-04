import "./App.css";

// react guardedRoute
import { GuardedRoute } from "react-router-guards";

// route component
import Test from "./components/Test";
import Test2 from "./components/Test2";
import Login from "./containers/Login/Login";

//ck editor
// import CKEditorCustom from './components/CKEditorCustom/CKEditorCustom';
import CreatePost from "./containers/CreatePost/index";

import { Switch, Link } from "react-router-dom";

<<<<<<< HEAD
import { Button, Grid } from "@material-ui/core";
=======
//ck editor 
import CKEditorCustom from './components/CKEditorCustom/CKEditorCustom';

import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


import {Button,Grid} from '@material-ui/core'
import TopMenu from './components/TopMenu';
import Dashboard from './components/Dashboard';
import Content from './components/Content';
import URLRouter from './components/URLRouter';
>>>>>>> 8a724ad (create component)

function App() {
  return (
    <Router>
    <div className="App">
<<<<<<< HEAD
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}></Grid>
=======
      {/* <Grid container spacing={3}>
        <Grid item xs={12} md={4}>

        </Grid>
>>>>>>> 8a724ad (create component)
        <Grid item xs={12} md={4}>
          <Link to="/1">
            <Button>Home</Button>
          </Link>
        </Grid>
<<<<<<< HEAD
        <Grid item xs={12} md={4}></Grid>
      </Grid>
      <Switch>
        <GuardedRoute path="/1" exact component={Test} meta={{ auth: true }} />
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
      </Switch>
=======
        <Grid item xs={12} md={4}>

        </Grid>

      </Grid> */}
      <TopMenu/>
      <div style={{backgroundColor: 'rgb(238,240,241)'}}>
          <URLRouter/>
      </div>
      {/* <Dinhhuong/> */}
      {/* <Switch>

          <GuardedRoute path="/1" exact component={Test} meta={{auth : true}}/>
          <GuardedRoute path="/2" exact component={Test2} meta={{auth : false}}/>
          <GuardedRoute path="/login" exact component={Login} meta={{auth : true}}/>
          <GuardedRoute path="/editor" exact component={CKEditorCustom} meta={{auth : true}}/>
          
      </Switch> */}
      
>>>>>>> 8a724ad (create component)
    </div>
    </Router>
  );
}

export default App;
