import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="pb-6 flex justify-between">
      <p className="text-primary font-mono text-xl">MUZIKI</p>
      {isAuthenticated && (
        <ul className="flex gap-x-4 justify-center items-center">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'text-primary font-semibold'
                  : 'hover:text-primary font-semibold'
              }
              to="/users"
            >
              Home
            </NavLink>
          </li>
          <li>
            <button
              onClick={logout}
              className="bg-primary text-white hover:bg-primary-dark py-2 px-4 border rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
