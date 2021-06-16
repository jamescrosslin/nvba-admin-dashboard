import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
// custom component imports
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';

import { useUserContext } from './context/UserContext';
import { useEffect, useState } from 'react';

function App() {
  const { user, signIn } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
            <Route path="/signup">
              <UserSignUp />
            </Route>
            <Route path="/signout">
              <UserSignOut />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    )
  );
}

export default App;
