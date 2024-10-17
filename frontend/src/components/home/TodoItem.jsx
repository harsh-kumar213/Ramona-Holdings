import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaCheck, FaUndo } from 'react-icons/fa'; // Importing icons

const TodoItem = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleEdit = () => {
    updateTask(task._id, { title, completed: task.completed });
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-400 rounded p-1 flex-1"
          />
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white px-3 py-2 ml-2 rounded-lg"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <div className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </div>
          <div className="flex space-x-2 items-center">
            <button onClick={() => setIsEditing(true)} className="text-yellow-500">
              <FaEdit size={20} />
            </button>
            <button onClick={() => deleteTask(task._id)} className="text-red-500">
              <FaTrashAlt size={20} />
            </button>
            <button
              onClick={() => updateTask(task._id, { ...task, completed: !task.completed })}
              className={`text-white px-2 py-1 rounded-lg ${task.completed ? 'bg-gray-500' : 'bg-blue-500'}`}
            >
              {task.completed ? <FaUndo size={20} /> : <FaCheck size={20} />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
