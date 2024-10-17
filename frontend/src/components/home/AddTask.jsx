import React, { useState } from 'react';

const AddTask = ({ addTask }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(title);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col justify-center p-3">
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="bg-white text-black input input-bordered mb-3 rounded p-1"
                placeholder="Add a new task"
                required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Add</button>
        </form>
    );
};

export default AddTask;
