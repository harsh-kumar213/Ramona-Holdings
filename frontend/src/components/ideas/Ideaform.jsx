import React, { useState } from 'react';

const IdeaForm = ({ existingIdea, onSubmit, onClose }) => {
  const [title, setTitle] = useState(existingIdea ? existingIdea.title : '');
  const [content, setContent] = useState(existingIdea ? existingIdea.content : '');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    onSubmit(formData);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-white text-black border border-gray-300 shadow-lg">
        <h3 className="font-bold text-2xl mb-6">
          {existingIdea ? 'Edit Idea' : 'Add New Idea'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label text-gray-700">Title</label>
            <input
              type="text"
              className="input input-bordered bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label text-gray-700">Content</label>
            <textarea
              className="textarea textarea-bordered bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          {!existingIdea && (
            <div className="form-control mb-4">
              <label className="label text-gray-700">Image</label>
              <input
                type="file"
                className="input input-bordered bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          )}

          <div className="form-control mt-6 flex justify-end">
            <button
              type="submit"
              className="btn btn-primary mb-5 bg-black text-white hover:bg-gray-800 transition-all"
            >
              {existingIdea ? 'Update Idea' : 'Create Idea'}
            </button>
            <button
              type="button"
              className="btn btn-secondary bg-white border border-gray-400 text-black hover:bg-gray-100 transition-all ml-4"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IdeaForm;
