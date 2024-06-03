import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../api/api';
import Navbar from '../components/Navbar/Navbar';
import Skeleton from '../components/Skeleton';
import PhotoDialog from '../components/PhotoDialog/PhotoDialog';

const AlbumPhoto = () => {
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [photo, setPhoto] = useState({ isLoading: true, data: null });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get(`photos/${params.photoId}`);
        setPhoto({
          isLoading: false,
          data: response.data,
        });
      } catch (error) {
        console.log(error);
        setPhoto({
          isLoading: false,
          data: null,
          error: error.message,
        });
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEdit = async (newTitle) => {
    const body = {
      albumId: photo.data.albumId,
      id: photo.data.id,
      title: newTitle,
      url: photo.data.url,
      thumbnailUrl: photo.data.thumbnailUrl,
    };
    try {
      console.log(body);
      // const response = await axiosInstance.put(
      //   `photos/${params.photoId}`,
      //   body
      // );
      // console.log('response body', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const displayLoading = photo.isLoading;
  const displayError = Boolean(!photo.isLoading && photo.error);
  const displayUnavailable = Boolean(
    !photo.isLoading && !photo.error && !photo.data
  );

  return (
    <>
      <Navbar />
      <p className="mb-4">
        <Link
          className="text-primary hover:underline"
          to={`/users/${params.id}/albums/${params.albumId}`}
        >
          Back to album
        </Link>
      </p>
      <div>
        {!displayError && !displayLoading && !displayUnavailable && (
          <div className="border rounded border-light-gray p-4 flex flex-col gap-y-4">
            <div className="w-60 h-auto">
              <img src={photo.data?.url} alt={photo.data?.title} />
            </div>
            <div className="flex gap-x-4 items-center">
              <p className="font-semibold">
                Title: <span className="font-normal">{photo.data?.title}</span>
              </p>
              <button
                className="bg-primary text-white hover:bg-primary-dark px-4 py-2 border rounded text-sm"
                onClick={() => setIsOpen(true)}
              >
                Edit Title
              </button>
            </div>
          </div>
        )}
        {displayUnavailable && <p>Data not available</p>}
        {displayLoading && <Skeleton />}
        {displayError && <p>{photo.error}</p>}
      </div>
      <PhotoDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClose={handleClose}
        title={photo.data?.title}
        handleEdit={handleEdit}
      />
    </>
  );
};

export default AlbumPhoto;
