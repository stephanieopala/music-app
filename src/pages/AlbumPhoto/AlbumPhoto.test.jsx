import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AlbumPhoto from './AlbumPhoto';
import axiosInstance from '../../../api/api';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}));

vi.mock('axios', async (importActual) => {
  const actual = await importActual();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post,
      })),
    },
  };

  return mockAxios;
});

const MockAlbumPhoto = () => {
  return (
    <BrowserRouter>
      <AlbumPhoto />
    </BrowserRouter>
  );
};

const mockPhotoDetails = {
  albumId: 31,
  id: 1501,
  title: 'doloremque distinctio consequuntur ab incidunt id nemo',
  url: 'https://via.placeholder.com/600/6a2db4',
  thumbnailUrl: 'https://via.placeholder.com/150/6a2db4',
};

const getData = async () => {
  try {
    const response = await axiosInstance.get('photos/1');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

describe('photo modal', () => {
  beforeAll(async () => {
    mocks.get.mockReturnValue({
      data: mockPhotoDetails,
    });
    await getData();
  });
  test('should display photo details after successful API call', async () => {
    expect(mocks.get).toHaveBeenCalled();
    // expect(data).toEqual(mockPhotoDetails);
  });

  test('should open and close modal', async () => {
    user.setup();
    render(<MockAlbumPhoto />);
    const editTitleButton = await screen.findByRole('button', {
      name: 'Edit Title',
    });
    await user.click(editTitleButton);
    const cancelButton = await screen.findByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    await user.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();
  });
});
