import { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

// custom components
import Header from './components/partials/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

// React context
import { useUserContext } from './context/UserContext';

function App() {
  const { user, signIn } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // define function to check for persistent sign in
    // and verify correct sign in
    async function checkUserStorage() {
      setIsLoading(true);
      if (localStorage?.user) {
        const { username, password } = JSON.parse(localStorage.user);
        await signIn(username, password);
      }
      setIsLoading(false);
    }

    checkUserStorage();
  }, [signIn]);

  return (
    !isLoading && (
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Route path="/" exact>
              <Courses />
            </Route>
            <PrivateRoute path="/courses/create">
              <CreateCourse />
            </PrivateRoute>
            <PrivateRoute path="/courses/:id/update" exact>
              <UpdateCourse />
            </PrivateRoute>
            <Route path="/courses/:id">
              <CourseDetail />
            </Route>
            <Route path="/signin">{user?.username ? <Redirect to="/" /> : <UserSignIn />}</Route>
            <Route path="/signup">{user?.username ? <Redirect to="/" /> : <UserSignUp />}</Route>
            <Route path="/signout">{user?.username ? <UserSignOut /> : <Redirect to="/" />}</Route>
            <Route path="/notfound">
              <NotFound />
            </Route>
            <Route path="/forbidden">
              <Forbidden />
            </Route>
            <Route path="/error">
              <UnhandledError />
            </Route>
            <Route>
              <Redirect to="/notfound" />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    )
  );
}

export default App;
