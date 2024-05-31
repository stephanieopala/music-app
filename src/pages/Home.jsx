import { useEffect, useState } from 'react';
import axiosInstance from '../../api/api';
import Navbar from '../components/Navbar/Navbar';
import { useAuth } from '../hooks/use-auth';

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
      <div className="border rounded-md border-light-gray py-2 sm:px-6 lg:px-8">
        <table className="min-w-full table-auto text-left">
          <thead className="border-b border-light-gray py-4">
            <tr>
              <th className="py-4 font-semibold">Name</th>
              <th className="py-4 font-semibold">Email</th>
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
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.website}</td>
                  <td>{numberOfAlbums}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {displayUnavailable && <p>Data not available</p>}
        {displayLoading && <p>...Loading</p>}
        {displayError && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Home;
