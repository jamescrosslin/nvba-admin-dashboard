import { Link, NavLink } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
function Header() {
  const { user } = useUserContext();
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <NavLink to="/">Courses</NavLink>
        </h1>
        <nav>
          <ul className={`header--${user.firstName ? 'signedin' : 'signedout'}`}>
            {(user.firstName && (
              <>
                <li>Welcome, Joe Smith!</li>
                <li>
                  <Link to="/signout">Sign Out</Link>
                </li>
              </>
            )) || (
              <>
                <li>
                  <NavLink to="/signup">Sign Up</NavLink>
                </li>
                <li>
                  <NavLink to="/signin">Sign In</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
