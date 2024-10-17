import React,{useState,useEffect} from 'react'

const ThesesForm = ({existingThesis,onSubmit,onClose}) => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

    useEffect(()=>{
        if(existingThesis)
        {
            setTitle(existingThesis.title);
            setDescription(existingThesis.description);
        }
    },[existingThesis]);

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(title,description);
        const formData ={
            title,
            description,
        }
        onSubmit(formData);
    }
  return (
    <div className="modal modal-open">
      <div className="modal-box bg-white text-black border border-gray-300 shadow-lg">
        <h3 className="font-bold text-2xl mb-6">
          {existingThesis ? 'Edit Thesis' : 'Add New Thesis'}
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
            <label className="label text-gray-700">Description</label>
            <textarea
              className="textarea textarea-bordered bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-control mt-6 flex justify-end">
            <button
              type="submit"
              className="btn btn-primary mb-5 bg-black text-white hover:bg-gray-800 transition-all"
            >
              {existingThesis ? 'Update Thesis' : 'Create Thesis'}
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
  )
}

export default ThesesForm