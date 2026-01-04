import {useContext} from 'react';
import {UserContext} from '../context/userContext'
import {NavLink} from 'react-router-dom'
const Navbar = () => {
  const { user } = useContext(UserContext)
  const linkStyles = 'border-b-2'
  return (
    <header className='flex bg-gray-900 justify-between px-20 py-10 items-center'>
        <h1 className='text-3xl'>LearnEra</h1>
      <nav>
        <ul className='flex gap-10'>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? linkStyles: "")}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/courses" className={({ isActive }) => (isActive ? linkStyles: "")}>Courses</NavLink>
          </li>
          {user ? (<>
            <li>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? linkStyles : "")}>Profile</NavLink>
            </li>
            <li>Welcome {user.firstName}</li>
            <li>
              <NavLink to="/logout" className={({ isActive }) => (isActive ? linkStyles : "")}>Logout</NavLink>
            </li>
          </>
          ) : (
            <>
              <li>
                <NavLink to="/auth" className={({ isActive }) => (isActive ?linkStyles : "")}>Login</NavLink>
              </li>
              <li>
                <NavLink to="/auth" className={({ isActive }) => (isActive ? linkStyles : "")}>Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;