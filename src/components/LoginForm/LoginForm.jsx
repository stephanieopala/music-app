import { useAuth } from '../../hooks/use-auth';

const LoginForm = () => {
  const { login } = useAuth();

  return (
    <div className="border-dark-gray rounded-md h-80 w-80 text-center flex flex-col gap-4 shadow-xl">
      <div className="py-2 rounded-tr-md rounded-tl-md">
        <p className="font-semibold text-lg text-primary">SignIn / SignUp</p>
      </div>
      <div className="px-2">
        <p className="text-dark-gray mb-4">
          Want to join the community? Sign up and explore various artists from
          all over the world and their music. Showcase your music to the world!
        </p>
        <button
          onClick={login}
          className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark cursor-pointer"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
