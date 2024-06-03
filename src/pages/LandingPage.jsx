import LoginForm from '../components/LoginForm/LoginForm';
import heroImage from '../assets/hero.jpg';
import Navbar from '../components/Navbar/Navbar';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-4 justify-center">
        <div className="w-full h-auto flex flex-col justify-center items-center gap-6">
          <p className="text-2xl font-semibold text-center text-primary">
            A community for artists by artists.
          </p>
          <p className="text-xl font-semibold text-center">
            Discover artists and their music. Get your music to a worldwide
            audience.
          </p>
          <div className="max-w-96 h-auto">
            <img src={heroImage} alt="person listening to music" />
          </div>
        </div>
        <div className="w-full h-auto flex flex-col justify-center items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
