import "./App.css";

// react guardedRoute
import { GuardedRoute } from "react-router-guards";

// route component
import Test from "./components/Test";
import Test2 from "./components/Test2";
import Login from "./containers/Login/Login";

import Header from '../src/components/Header/Header';
import Register from '../src/containers/Register/Register';

import LoadmoreDemo from "./containers/LoadmoreDemo/LoadmoreDemo";

//ck editor
// import CKEditorCustom from './components/CKEditorCustom/CKEditorCustom';
import CreatePost from "./containers/CreatePost/index";

import { Switch } from "react-router-dom";

//ck editor 



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

        </Switch>)


}

export default App;
