import "./App.css";

// react guardedRoute
import { GuardedRoute } from "react-router-guards";

// route component
import Login from "./containers/Login/Login";

import Home from "./containers/Home/HomeComponent";

import Register from "../src/containers/Register/Register";

import RequireVerifyEmail from "./components/RequireVerifyEmail/RequireVerifyEmail";

//ck editor
import PostEditor from "./containers/PostEditor/index";
import { Switch } from "react-router-dom";
import HBHeader from "./components/HBHeader/HBHeader";
import NotFoundC from "./components/Not Found/NotFoundC";

import Favorite from "./containers/Favorite";

// USER
import EditProfile from "./containers/UserProfile/Edit/UserProfile";
import ViewProfile from "./containers/UserProfile/View/ViewProfile";

//ck editor
import PostDetails from "./containers/PostDetails";
import FileManagement from "./containers/FileManagement";
import TagsPanel from "./containers/TagsPanel";
import ToastContainerConfig from "./configs/toast/ToastContainerConfig";
import SearchScreen from "./containers/Search";
import FollowingPost from "./containers/FollowingPost";
import QuestionPost from "./containers/QuestionPost";
import TagPost from "./containers/TagPost";
import Personal from "./containers/Personal";
import Wallets from "./containers/Wallets/Wallets";

function App() {
  return (
    <div>
      <HBHeader />
      <ToastContainerConfig />
      <Switch>
        <GuardedRoute
          path="/login"
          exact
          component={Login}
          meta={{ auth: true }}
        />
        <GuardedRoute
          path="/editor"
          exact
          component={PostEditor}
          meta={{ auth: true }}
        />

        <GuardedRoute path="/p/:id/:title" exact component={PostDetails} />
        <GuardedRoute
          path="/p/:id/:title/edit"
          exact
          render={() => <PostEditor isEdit={true} />}
          meta={{ auth: true }}
        />

        <GuardedRoute
          path="/register"
          exact
          component={Register}
          meta={{ auth: false }}
        />

        <GuardedRoute
          path="/file"
          exact
          component={FileManagement}
          meta={{ auth: true }}
        />

        <GuardedRoute
          path="/email"
          exact
          component={RequireVerifyEmail}
          meta={{ auth: false }}
        />

        <GuardedRoute path="/" exact component={Home} meta={{ auth: false }} />
        <GuardedRoute
          path="/favorites"
          exact
          component={Favorite}
          meta={{ auth: true }}
        />
        <GuardedRoute
          path="/questions"
          exact
          component={QuestionPost}
          meta={{ auth: false }}
        />
        <GuardedRoute
          path="/t/:tagId/:tagName"
          exact
          component={TagPost}
          meta={{ auth: false }}
        />
        <GuardedRoute path="/tags" exact component={TagsPanel} />

        {/* <GuardedRoute
          path="/search"
          exact
          component={SearchPage}
          meta={{ auth: false }}
        /> */}

        <GuardedRoute
          path="/search"
          exact
          component={SearchScreen}
          meta={{ auth: false }}
        />

        <GuardedRoute
          path="/followings"
          exact
          component={FollowingPost}
          meta={{ auth: true }}
        />

        <GuardedRoute
          path="/edit-profile"
          exact
          component={EditProfile}
          meta={{ auth: true }}
        />

        <GuardedRoute
          path="/view-profile"
          exact
          component={ViewProfile}
          meta={{ auth: true }}
        />

        <GuardedRoute
          path="/user/personal/:nickName"
          exact
          component={Personal}
        />
          <GuardedRoute
              path="/wallet"
              exact
              component={Wallets}
              meta = {{auth : true }}
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
