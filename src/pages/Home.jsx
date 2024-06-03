import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/api';
import Navbar from '../components/Navbar/Navbar';
import { useAuth } from '../hooks/use-auth';
import Skeleton from '../components/Skeleton';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const { isAuthenticated } = useAuth();

  console.log(('isAuth', isAuthenticated));

  useEffect(() => {
    const loadData = async () => {
      const usersList = axiosInstance.get('users');
      const albumsList = axiosInstance.get('albums');
      const allPromise = Promise.all([usersList, albumsList]);
      try {
        const values = await allPromise;
        setUsers(values[0].data);
        setAlbums(values[1].data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setErrorMessage(error.message);
      }
    };
    loadData();
  }, []);

  const displayLoading = loading;
  const displayError = Boolean(!loading && errorMessage);
  const displayUnavailable = Boolean(
    !loading && !errorMessage && !users?.length && !albums?.length
  );

  return (
    <div>
      <Navbar />
      <div className="overflow-x-auto border rounded-md border-light-gray py-2 sm:px-6 lg:px-8">
        <table className="min-w-full table-auto text-left">
          <thead className="border-b border-light-gray py-4">
            <tr>
              <th className="py-4 font-semibold">Name</th>
              <th className="py-4 font-semibold">Website</th>
              <th className="py-4 font-semibold">Albums</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              const filteredAlbums = albums.filter(
                (album) => album.userId === user.id
              );
              const numberOfAlbums = filteredAlbums.length;
              return (
                <tr
                  key={user.id}
                  className="border-b border-light-gray hover:bg-table-head cursor-pointer"
                >
                  <td className="pr-1 sm:pr-6 py-4">
                    <Link
                      to={`/users/${user.id}`}
                      className="hover:underline hover:text-primary"
                    >
                      {user?.name}
                    </Link>
                    <p className="text-dark-gray">{`@ ${user?.username}`}</p>
                  </td>
                  <td className="pr-1 sm:pr-6 py-4">{user?.website}</td>
                  <td className="pr-1 sm:pr-6 py-4">{numberOfAlbums}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {displayUnavailable && <p>Data not available</p>}
        {displayLoading && <Skeleton />}
        {displayError && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Home;
