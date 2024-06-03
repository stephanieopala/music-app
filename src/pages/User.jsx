import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../api/api';
import Navbar from '../components/Navbar/Navbar';
import Skeleton from '../components/Skeleton';

const User = () => {
  const params = useParams();
  const [userInfo, setUserInfo] = useState();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const loadItems = async () => {
      const userDetails = axiosInstance.get(`users/${params.id}`);
      const albumsList = axiosInstance.get(`users/${params.id}/albums`);
      const allPromise = Promise.all([userDetails, albumsList]);
      try {
        const values = await allPromise;
        setUserInfo(values[0].data);
        setAlbums(values[1].data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setErrorMessage(error.message);
      }
    };
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayLoading = loading;
  const displayError = Boolean(!loading && errorMessage);
  const displayUnavailable = Boolean(
    !loading && !errorMessage && !userInfo && !albums?.length
  );

  return (
    <>
      <Navbar />
      <p className="mb-4">
        <Link className="text-primary hover:underline" to="/users">
          Back to home
        </Link>
      </p>
      <div>
        <div>
          <div>
            <p>{userInfo?.name}</p>
            <p className="text-dark-gray">{`@${userInfo?.username}`}</p>
          </div>
          <div>
            <table className="min-w-full table-auto text-left">
              <thead className="border-b border-light-gray py-4">
                <tr>
                  <th className="py-4 font-semibold">Albums</th>
                </tr>
              </thead>
              <tbody>
                {albums?.map((album) => {
                  return (
                    <tr
                      key={album.id}
                      className="border-b border-light-gray hover:bg-table-head cursor-pointer"
                    >
                      <td className="px-2 sm:px-6 py-4">
                        <Link
                          to={`/users/${userInfo.id}/albums/${album.id}`}
                          className="hover:underline hover:text-primary"
                        >
                          {album?.title}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {displayUnavailable && <p>Data not available</p>}
        {displayLoading && <Skeleton />}
        {displayError && <p>{errorMessage}</p>}
      </div>
    </>
  );
};

export default User;
