import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <main>
          <Switch>
            <Route path="/" exact>
              <Courses />
            </Route>
            <Route path="/courses/create">
              <CreateCourse />
            </Route>
            <Route path="/courses/:id/update" exact>
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
        </main>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
