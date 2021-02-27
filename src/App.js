
import './App.css';

// react guardedRoute 
import {GuardedRoute} from 'react-router-guards';


// route component 
import Test from './Test';
import Test2 from './Test2';
import Login from './containers/Login/Login';

import {Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
          <GuardedRoute path="/1" exact component={Test} meta={{auth : true}}/>
          <GuardedRoute path="/2" exact component={Test2} meta={{auth : false}}/>
          <GuardedRoute path="/login" exact component={Login} meta={{auth : true}}/>
      </Switch>
      
    </div>
  );
}

export default App;
