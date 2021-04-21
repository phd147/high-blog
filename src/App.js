import "./App.css";

// react guardedRoute
import { GuardedRoute } from "react-router-guards";

// route component
import Test from "./components/Test";
import Test2 from "./components/Test2";
import Login from "./containers/Login/Login";

import Home from "./containers/Home/HomeComponent";

import Register from "../src/containers/Register/Register";

import LoadmoreDemo from "./containers/LoadmoreDemo/LoadmoreDemo";

import RequireVerifyEmail from "./components/RequireVerifyEmail/RequireVerifyEmail";

//ck editor
// import CKEditorCustom from './components/CKEditorCustom/CKEditorCustom';
import CreatePost from "./containers/CreatePost/index";
import { Switch } from "react-router-dom";
import HBHeader from "./components/HBHeader/HBHeader";
import NotFoundC from "./components/Not Found/NotFoundC";
import Menu from "./components/Menu/Menu";

//ck editor

import { BrowserRouter as Router, Route } from "react-router-dom";
import PostDetails from "./containers/PostDetails";
import FileManagement from "./containers/FileManagement";

function App() {
  return (
    <div>
      <HBHeader />
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

        <GuardedRoute
          path="/register"
          exact
          component={Register}
          meta={{ auth: false }}
        />
        <GuardedRoute
          path="/loadmore"
          exact
          component={LoadmoreDemo}
          meta={{ auth: false }}
        />

        <GuardedRoute
          path="/email"
          exact
          component={RequireVerifyEmail}
          meta={{ auth: false }}
        />

        <GuardedRoute path="/" exact component={Home} meta={{ auth: false }} />

        <GuardedRoute
          path="/menu"
          exact
          component={Menu}
          meta={{ auth: false }}
        />
        <GuardedRoute path="/:id/:title" exact component={PostDetails} />
        <GuardedRoute
          path="/file"
          exact
          component={FileManagement}
          meta={{ auth: true }}
        />
        <GuardedRoute
          path="*"
          exact
          component={NotFoundC}
          meta={{ auth: false }}
        />
      </Switch>
    </div>
  );
}

export default App;
