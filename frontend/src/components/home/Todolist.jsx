import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem.jsx';
import AddTask from './AddTask.jsx';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const[all,setAll] = useState(false);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('/api/home/tasks');
    setTasks(response.data);
  };

  const addTask = async (title) => {
    const response = await axios.post('/api/home/tasks', { title });
    setTasks([response.data, ...tasks]);
  };

  const updateTask = async (id, updatedTask) => {
    await axios.put(`/api/home/tasks/${id}`, updatedTask);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/home/tasks/${id}`);
    fetchTasks();
  };

  tasks = all?tasks.slice(0,3):tasks;
  
  return (
    <div className="container mx-auto border-1   rounded bg-white border mt-8 max-w-xl">
      <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>
      <AddTask addTask={addTask} />
      <div className="grid gap-4">
        {tasks.slice(0, 3).map((task) => (
          <TodoItem
            key={task._id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
      <button
        onClick={() => setAll(true)}
        className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-700"
      >
        Show All Tasks
      </button>
      {all &&
       <button
       onClick={() => setAll(false)}
       className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-700"
     >
       Hide All Tasks
     </button>
      }
    </div>
  );
};

export default TodoList;
