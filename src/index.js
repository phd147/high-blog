import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import "react-bootstrap-typeahead/css/Typeahead.css";

import 'react-toastify/dist/ReactToastify.css'

import App from './App';
//import reportWebVitals from './reportWebVitals';

//react-router-guards 
import {GuardProvider} from 'react-router-guards';

//react router dom 
import {BrowserRouter} from 'react-router-dom';


//user service
import {getUserInfor} from './services/user.service';


//redux 
import {createStore,compose,combineReducers,applyMiddleware} from 'redux';

// import reducer 
import {oneReducer} from './store/reducers/oneReducer';
import {twoReducer} from './store/reducers/twoReducer';
import userReducer from './store/reducers/userReducer';

//action 
import * as actionTypes from './store/action/actionTypes';


// import thunk middleware 
import thunk from 'redux-thunk';

// provider 
import {Provider} from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 



// create combine reducer 
const reducer = combineReducers(
  {
    one : oneReducer,
    two : twoReducer,
    user : userReducer
  }
)

// create redux store 
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));


const requireLogin = async (to,from,next) => {

    // call api to get user infor
    try {
        const res = await getUserInfor();
        const data = res.data;
        store.dispatch({
            type: actionTypes.INIT_USER_INFOR,
            firstName: data.firstName,
            lastName: data.lastName,
            roles: data.roleTypes,
            userId: data.id
        });
        if (to.location.path === '/login') next.redirect('/home');
        next();
    } catch (err) {
        console.log(err);
        if (!to.meta.auth) {
            next();
        } else {
            next.redirect('/login');
        }
    }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GuardProvider guards={[requireLogin]}>
          <App />
        </GuardProvider>
       
      </BrowserRouter>
   
    </Provider>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

