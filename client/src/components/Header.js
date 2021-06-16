import { Link, NavLink } from 'react-router-dom';
function Header(props) {
  const { prop } = props;
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <NavLink to="/">Courses</NavLink>
        </h1>
        <nav>
          <ul className="header--signedout">
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="/signin">Sign In</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
