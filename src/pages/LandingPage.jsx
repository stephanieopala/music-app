import { useAuth } from '../hooks/use-auth';

const LandingPage = () => {
  const { login } = useAuth();

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default LandingPage;
