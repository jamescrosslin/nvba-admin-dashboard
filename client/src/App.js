import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Courses />
        </Route>
        <Route path="/courses/create">
          <CreateCourse />
        </Route>
        <Route path="/courses/:id/update">
          <UpdateCourse />
        </Route>
        <Route path="/courses/:id">
          <CourseDetail />
        </Route>
        <Route path="/signin">
          <UserSignIn />
        </Route>
        <Route path="/signup">
          <UserSignUp />
        </Route>
        <Route path="/signout">
          <UserSignOut />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
