import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../../../api/api';
import Navbar from '../../components/Navbar/Navbar';
import Skeleton from '../../components/Skeleton';
import Modal from '../../components/Modal/Modal';

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

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (setNewTitle, setNewTitleError) => {
    setIsOpen(false);
    setNewTitle('');
    setNewTitleError(null);
  };

  const handleEdit = async (
    newTitle,
    setNewTitle,
    newTitleError,
    setNewTitleError
  ) => {
    const body = {
      albumId: photo.data.albumId,
      id: photo.data.id,
      title: newTitle,
      url: photo.data.url,
      thumbnailUrl: photo.data.thumbnailUrl,
    };
    try {
      if (!newTitleError) {
        const response = await axiosInstance.put(
          `photos/${params.photoId}`,
          JSON.stringify(body)
        );
        setNewTitle('');
        setNewTitleError(null);
        toast.success('Title updated successfully');
        setIsOpen(false);
        setPhoto({ isLoading: false, data: response.data });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
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
                onClick={handleOpen}
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
      <Modal
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
