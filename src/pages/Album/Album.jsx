import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/api';
import Navbar from '../../components/Navbar/Navbar';
import Skeleton from '../../components/Skeleton';

const Album = () => {
  const params = useParams();
  const [albumInfo, setAlbumInfo] = useState();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const loadItems = async () => {
      const albumDetails = axiosInstance.get(`albums/${params.albumId}`);
      const photosList = axiosInstance.get(`albums/${params.albumId}/photos`);
      const allPromise = Promise.all([albumDetails, photosList]);
      try {
        const values = await allPromise;
        setAlbumInfo(values[0].data);
        setPhotos(values[1].data);
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
    !loading && !errorMessage && !albumInfo && !photos?.length
  );

  return (
    <>
      <Navbar />
      <p className="mb-4">
        <Link
          className="text-primary hover:underline"
          to={`/users/${params.id}`}
        >
          Back to albums
        </Link>
      </p>
      <div>
        <div>
          <p className="text-xl font-semibold">{albumInfo?.title}</p>
          <p className="font-semibold my-4">Album Photos</p>
          <div className="flex flex-wrap gap-4">
            {photos?.map((photo) => (
              <div
                key={photo.id}
                className="w-24 overflow-hidden flex flex-col h-32"
              >
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <p className="text-xs text-ellipsis font-normal">
                  <Link
                    to={`/users/${params.id}/albums/${params.albumId}/photo/${photo.id}`}
                    className="hover:underline hover:text-primary"
                  >
                    {photo.title}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
        {displayUnavailable && <p>Data not available</p>}
        {displayLoading && <Skeleton />}
        {displayError && <p>{errorMessage}</p>}
      </div>
    </>
  );
};

export default Album;
