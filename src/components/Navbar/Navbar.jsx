import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <nav className="pb-6">
      <p className="text-primary font-mono text-xl">MUZIKI</p>
      {isAuthenticated && (
        <ul className="hidden sm:flex gap-x-4">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'text-primary font-semibold'
                  : 'hover:text-primary font-semibold'
              }
              to="/home"
            >
              Home
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
