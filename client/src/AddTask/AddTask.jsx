import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");

  const handleTitleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 50) {
      setTitleError("Title cannot exceed 50 characters.");
    } else {
      setTitleError("");
    }
    setTitle(inputValue.slice(0, 50));
  };

  const handleDescriptionChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 200) {
      setDescError("Description cannot exceed 200 characters.");
    } else {
      setDescError("");
    }
    setDescription(inputValue.slice(0, 200));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (titleError || descError) {
      return;
    }

    axios
      .post("https://server-9cbm2dzrw-mahabub2030s-projects.vercel.app/tasks", {
        title,
        description,
        category,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Task added successfully!",
        });

        setTitle("");
        setDescription("");
        setCategory("To-Do");
        setTitleError("");
        setDescError("");
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full p-2 border bg-white/10 rounded-md"
            required
          />
          {titleError && (
            <p className="text-red-500 text-sm mt-1">{titleError}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="w-full p-2 border rounded-md bg-white/10"
            required
          />
          {descError && (
            <p className="text-red-500 text-sm mt-1">{descError}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md bg-white/10"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-full mt-5 rounded-lg"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
