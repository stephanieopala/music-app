import { useState } from 'react';
import PropTypes from 'prop-types';

const PhotoDialog = ({ isOpen, handleClose, title, handleEdit }) => {
  const [newTitle, setNewTitle] = useState(''); //add form validation

  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 bg-modal-bg flex items-center justify-center">
      <div className="bg-white p-4 border rounded border-modal-bg min-w-72">
        <p className="font-semibold text-xl mb-4">Title: {title}</p>
        <form className="flex flex-col gap-y-4">
          <label htmlFor="new-title" className="font-semibold">
            New title:
          </label>
          <input
            type="text"
            id="new-title"
            placeholder="Enter new photo title..."
            className="border rounded border-light-gray p-2"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </form>
        <div className="mt-4 flex gap-x-4 justify-end">
          <button
            onClick={handleClose}
            className="border border-primary text-primary text-sm p-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => handleEdit(newTitle)}
            className="bg-primary text-white p-2 rounded hover:bg-primary-dark text-sm"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

PhotoDialog.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  handleEdit: PropTypes.func,
  title: PropTypes.string,
};

export default PhotoDialog;
