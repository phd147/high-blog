
import './App.css';


// react guardedRoute 
import {GuardedRoute} from 'react-router-guards';

// route component 
import Test from './components/Test';
import Test2 from './components/Test2';
import Login from './containers/Login/Login';

//ck editor 
// import CKEditorCustom from './components/CKEditorCustom/CKEditorCustom';
import CreatePost from "./containers/CreatePost/index";

import {Switch,Link} from 'react-router-dom';


import {Button,Grid} from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>

        </Grid>
        <Grid item xs={12} md={4}>
          <Link to="/1">
          <Button>Home</Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>

        </Grid>

      </Grid>
      <Switch>

          <GuardedRoute path="/1" exact component={Test} meta={{auth : true}}/>
          <GuardedRoute path="/2" exact component={Test2} meta={{auth : false}}/>
          <GuardedRoute path="/login" exact component={Login} meta={{auth : true}}/>
          <GuardedRoute path="/editor" exact component={CreatePost} meta={{auth : true}}/>
          
      </Switch>
      
    </div>
  );
}

export default App;
