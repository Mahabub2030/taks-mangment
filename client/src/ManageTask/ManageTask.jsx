import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import Swal from "sweetalert2";

const ManageTask = () => {
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("https://server-pied-omega.vercel.app/tasks");
      return res.data;
    },
  });

  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState({});
  console.log(editTask, "edit task");
  React.useEffect(() => {
    if (data.length) {
      setTasks(data);
    }
  }, [data]);

  const handleDeleted = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axios.delete(`https://server-pied-omega.vercel.app/tasks/${id}`);

        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
          refetch();
        } else {
          Swal.fire("Failed!", "Task deletion failed.", "error");
        }
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
      console.error("Error deleting task:", error);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.category = destination.droppableId; // Update the category

    updatedTasks.splice(destination.index, 0, movedTask);
    setTasks(updatedTasks);
  };

  const categorizedTasks = {
    "To-Do": tasks.filter((task) => task.category === "To-Do"),
    "In Progress": tasks.filter((task) => task.category === "In Progress"),
    Done: tasks.filter((task) => task.category === "Done"),
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `https://server-pied-omega.vercel.app/tasks/${editTask._id}`,
      editTask
    );
    refetch();
    // queryClient.invalidateQueries(["tasks"]);
    
  };

  if (isLoading) return <p >Loading...</p>;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {["To-Do", "In Progress", "Done"].map((category) => (
        <div key={category}>
          <h2 className="text-xl font-bold mb-4">{category}</h2>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId={category}>
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="p-4  rounded"
                >
                  {categorizedTasks[category].map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border border-gray-800 mb-5 p-2 relative rounded cursor-move"
                        >
                          <h3 className="font-semibold mb-1">
                            Title: {task.title}
                          </h3>
                          <p className="mb-1">
                            Description: {task.description}
                          </p>
                          <p className="mb-1">Category: {task.category}</p>
                          <button
                            onClick={() => handleDeleted(task._id)}
                            className="text-red-500 "
                          >
                            {/* Delete Icons */}
                            <MdDeleteForever className="absolute top-0 right-8 text-xl" />
                          </button>

                          {/* Edit Button */}
                          <label
                            onClick={() => setEditTask(task)}
                            htmlFor={`modal_${task._id}`}
                            className="text-green-500 ml-20 cursor-pointer"
                          >
                            {/* Edit Icon use  */}
                            <MdModeEditOutline className="absolute text-xl top-0 right-0" />
                          </label>

                          {/* Unique Modal for Each Task */}
                          <input
                            type="checkbox"
                            id={`modal_${task._id}`}
                            className="modal-toggle"
                          />

                          <div className="modal" role="dialog">
                            <div className="modal-box">
                              <h3 className="text-lg font-bold">Edit Task</h3>

                              {/* Update Form */}
                              <form onSubmit={handleSubmitUpdate}>
                                <div className="mb-4">
                                  <label className="block mb-2">Title</label>
                                  <input
                                    type="text"
                                    name="title"
                                    maxLength={50}
                                    value={editTask.title || ""}
                                    onChange={(e) =>
                                      setEditTask({
                                        ...editTask,
                                        title: e.target.value,
                                      })
                                    }
                                    className="w-full p-2 border"
                                    required
                                  />
                                </div>

                                <div className="mb-4">
                                  <label className="block mb-2">
                                    Description
                                  </label>
                                  <textarea
                                    name="description"
                                    maxLength={200}
                                    value={editTask.description || ""}
                                    onChange={(e) =>
                                      setEditTask({
                                        ...editTask,
                                        description: e.target.value,
                                      })
                                    }
                                    className="w-full p-2 border"
                                    required
                                  />
                                </div>

                                <div className="mb-4">
                                  <label className="block mb-2">Category</label>
                                  <select
                                    value={editTask.category || "In Progress"}
                                    onChange={(e) =>
                                      setEditTask({
                                        ...editTask,
                                        category: e.target.value,
                                      })
                                    }
                                    className="w-full p-2 border"
                                  >
                                    <option value="To-Do">To-Do</option>
                                    <option value="In Progress">
                                      In Progress
                                    </option>
                                    <option value="Done">Done</option>
                                  </select>
                                </div>

                                {/* Update Button */}
                                <button
                                  type="submit"
                                  className="bg-blue-500 text-white w-full mt-5 rounded-md"
                                >
                                  Update Now
                                </button>
                              </form>
                            </div>

                            {/* Close Modal */}
                            <label
                              className="modal-backdrop"
                              htmlFor={`modal_${task._id}`}
                            >
                              Close
                            </label>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      ))}
    </div>
  );
};

export default ManageTask;

// import { useQuery } from "@tanstack/react-query";
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import axios from "axios";
// import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";

// const ManageTask = () => {
//   const { data = [], isLoading, error, refetch } = useQuery({
//     queryKey: ["tasks"],
//     queryFn: async () => {
//       const res = await axios.get("https://server-pied-omega.vercel.app/tasks");
//       return res.data;
//     },
//   });

//   const [tasks, setTasks] = useState([]);
//   const [editTask, setEditTask] = useState({});

//   useEffect(() => {
//     if (data.length) setTasks(data);
//   }, [data]);

//   const handleDelete = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//       });

//       if (result.isConfirmed) {
//         const res = await axios.delete(`https://server-pied-omega.vercel.app/tasks/${id}`);
//         if (res.data.deletedCount > 0) {
//           Swal.fire("Deleted!", "Your task has been deleted.", "success");
//           refetch();
//         } else {
//           Swal.fire("Failed!", "Task deletion failed.", "error");
//         }
//       }
//     } catch (error) {
//       Swal.fire("Error!", "Something went wrong.", "error");
//     }
//   };

//   const handleDragEnd = (result) => {
//     if (!result.destination) return;

//     const updatedTasks = [...tasks];
//     const [movedTask] = updatedTasks.splice(result.source.index, 1);
//     movedTask.category = result.destination.droppableId;
//     updatedTasks.splice(result.destination.index, 0, movedTask);

//     setTasks(updatedTasks);
//   };

//   const categorizedTasks = {
//     "To-Do": tasks.filter((task) => task.category === "To-Do"),
//     "In Progress": tasks.filter((task) => task.category === "In Progress"),
//     Done: tasks.filter((task) => task.category === "Done"),
//   };

//   const handleSubmitUpdate = async (e) => {
//     e.preventDefault();
//     await axios.put(`https://server-pied-omega.vercel.app/tasks/${editTask.id}`, editTask);
//     refetch();
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading tasks.</p>;

//   return (
//     <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       <DragDropContext onDragEnd={handleDragEnd}>
//         {Object.keys(categorizedTasks).map((category) => (
//           <div key={category}>
//             <h2 className="text-xl font-bold mb-4">{category}</h2>
//             <Droppable droppableId={category}>
//               {(provided) => (
//                 <ul {...provided.droppableProps} ref={provided.innerRef} className="p-4 rounded">
//                   {categorizedTasks[category].map((task, index) => (
//                     <Draggable key={task._id} draggableId={task._id} index={index}>
//                       {(provided) => (
//                         <li
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="border border-gray-800 mb-5 p-2 relative rounded cursor-move"
//                         >
//                           <h3 className="font-semibold mb-1">Title: {task.title}</h3>
//                           <p className="mb-1">Description: {task.description}</p>
//                           <p className="mb-1">Category: {task.category}</p>
//                           <button onClick={() => handleDelete(task._id)} className="text-red-500">
//                             <MdDeleteForever className="absolute top-0 right-8 text-xl" />
//                           </button>
//                           <label onClick={() => setEditTask(task)} htmlFor={`modal_${task._id}`} className="text-green-500 ml-20 cursor-pointer">
//                             <MdModeEditOutline className="absolute text-xl top-0 right-0" />
//                           </label>
//                           <input type="checkbox" id={`modal_${task._id}`} className="modal-toggle" />
//                           <div className="modal" role="dialog">
//                             <div className="modal-box">
//                               <h3 className="text-lg font-bold">Edit Task</h3>
//                               <form onSubmit={handleSubmitUpdate}>
//                                 <label className="block mb-2">Title</label>
//                                 <input type="text" name="title" value={editTask.title || ""} onChange={(e) => setEditTask({ ...editTask, title: e.target.value })} className="w-full p-2 border" required />
//                                 <label className="block mb-2">Description</label>
//                                 <textarea name="description" value={editTask.description || ""} onChange={(e) => setEditTask({ ...editTask, description: e.target.value })} className="w-full p-2 border" required />
//                                 <label className="block mb-2">Category</label>
//                                 <select value={editTask.category || "In Progress"} onChange={(e) => setEditTask({ ...editTask, category: e.target.value })} className="w-full p-2 border">
//                                   <option value="To-Do">To-Do</option>
//                                   <option value="In Progress">In Progress</option>
//                                   <option value="Done">Done</option>
//                                 </select>
//                                 <button type="submit" className="bg-blue-500 text-white w-full mt-5 rounded-md">Update Now</button>
//                               </form>
//                             </div>
//                             <label className="modal-backdrop" htmlFor={`modal_${task._id}`}>Close</label>
//                           </div>
//                         </li>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </ul>
//               )}
//             </Droppable>
//           </div>
//         ))}
//       </DragDropContext>
//     </div>
//   );
// };

// export default ManageTask;


