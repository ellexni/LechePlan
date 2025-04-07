// components/Modal.js
import React from "react";

const Modal = ({ show, onClose, onSubmit, todo, setTodo }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl mb-4">Add/Edit a To-do</h2>
        <input
          className="w-full mb-2 p-2 border"
          placeholder="Title"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <input
          className="w-full mb-2 p-2 border"
          placeholder="Course"
          value={todo.course}
          onChange={(e) => setTodo({ ...todo, course: e.target.value })}
        />
        <input
          className="w-full mb-2 p-2 border"
          type="date"
          value={todo.due_date}
          onChange={(e) => setTodo({ ...todo, due_date: e.target.value })}
        />
        <input
          className="w-full mb-4 p-2 border"
          placeholder="Estimated time 00:00:00"
          value={todo.estimated_time}
          onChange={(e) => setTodo({ ...todo, estimated_time: e.target.value })}
        />
        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-400 px-4 py-2 rounded">Cancel</button>
          <button onClick={onSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
