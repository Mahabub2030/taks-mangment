import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const InProgress = () => {
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/tasks");
      return res.data;
    },
  });

  // State for editing a task
  const [editTask, setEditTask] = useState({});
  console.log(editTask, 'edit task');

  // Handle delete
  const handleDelete = async (id) => {
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
        const res = await axios.delete(`http://localhost:5000/tasks/${id}`);

        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
          queryClient.invalidateQueries(["tasks"]); // Refresh data
        } else {
          Swal.fire("Failed!", "Task deletion failed.", "error");
        }
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
      console.error("Error deleting task:", error);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:5000/tasks/${editTask._id}`,
      editTask
    );
    console.log(res);
    queryClient.invalidateQueries(["tasks"]);
  };

  // Function to handle drag end
  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If dropped outside the list, do nothing
    if (!destination) return;

    // If the task is dropped in a different position, update the order
    if (destination.index !== source.index) {
      const reorderedTasks = [...tasks];
      const [removed] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, removed);

      // Here, you can send the reordered list to the server if needed
      // For now, just update the local state and re-fetch tasks
      queryClient.setQueryData(["tasks"], reorderedTasks);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">In Progress Tasks</h2>

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasksList">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks
                .filter((task) => task.category.trim() === "In Progress")
                .map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <li
                        key={task._id}
                        className="border p-2 mb-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h3 className="font-semibold">Title: {task.title}</h3>
                        <p>Description: {task.description}</p>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="text-red-500"
                        >
                          Delete
                        </button>

                        {/* Edit Button */}
                        <label
                          onClick={() => setEditTask(task)}
                          htmlFor={`modal_${task._id}`}
                          className="text-green-500 ml-20 cursor-pointer"
                        >
                          Edit
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
                                <label className="block mb-2">Description</label>
                                <textarea
                                  name="description"
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
                                  <option value="In Progress">In Progress</option>
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
                          <label className="modal-backdrop" htmlFor={`modal_${task._id}`}>
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
  );
};

export default InProgress;

// import React, { useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import Swal from "sweetalert2";

// const InProgress = () => {
//   const queryClient = useQueryClient();
  
//   // Fetch tasks
//   const { data: tasks = [], isLoading, error } = useQuery({
//     queryKey: ["tasks"],
//     queryFn: async () => {
//       const res = await axios.get("https://assinment-eleven-server-site.vercel.app/tasks");
//       return res.data;
//     },
//   });

//   // State for editing a task
//   const [editTask, setEditTask] = useState({});
//   console.log(editTask, 'edit task');

//   // Handle delete
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
//         const res = await axios.delete(`https://assinment-eleven-server-site.vercel.app/tasks/${id}`);

//         if (res.data.deletedCount > 0) {
//           Swal.fire("Deleted!", "Your task has been deleted.", "success");
//           queryClient.invalidateQueries(["tasks"]); // Refresh data
//         } else {
//           Swal.fire("Failed!", "Task deletion failed.", "error");
//         }
//       }
//     } catch (error) {
//       Swal.fire("Error!", "Something went wrong.", "error");
//       console.error("Error deleting task:", error);
//     }
//   };


//   const handleSubmitUpdate = async (e) => {
//     e.preventDefault();
//       const res = await axios.put(`https://assinment-eleven-server-site.vercel.app/tasks/${editTask._id}`, editTask);
//       console.log(res);

     
   
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">In Progress Tasks</h2>
//       <ul>
//         {tasks
//           .filter((task) => task.category.trim() === "In Progress")
//           .map((task) => (
//             <li key={task._id} className="border p-2 mb-2">
//               <h3 className="font-semibold">Title: {task.title}</h3>
//               <p>Description: {task.description}</p>

//               {/* Delete Button */}
//               <button
//                 onClick={() => handleDelete(task._id)}
//                 className="text-red-500"
//               >
//                 Delete
//               </button>

//               {/* Edit Button */}
//               <label
//                 onClick={() => setEditTask(task)}
//                 htmlFor={`modal_${task._id}`}
//                 className="text-green-500 ml-20 cursor-pointer"
//               >
//                 Edit
//               </label>

//               {/* Unique Modal for Each Task */}
//               <input type="checkbox" id={`modal_${task._id}`} className="modal-toggle" />
//               <div className="modal" role="dialog">
//                 <div className="modal-box">
//                   <h3 className="text-lg font-bold">Edit Task</h3>

//                   {/* Update Form */}
//                   <form onSubmit={handleSubmitUpdate}>
//                     <div className="mb-4">
//                       <label className="block mb-2">Title</label>
//                       <input
//                         type="text"
//                         name="title"
//                         defaultValue={editTask.title}
//                         onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
//                         className="w-full p-2 border"
//                         required
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label className="block mb-2">Description</label>
//                       <textarea
//                         name="description"
//                         defaultValue={editTask.description}
//                         onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
//                         className="w-full p-2 border"
//                         required
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label className="block mb-2">Category</label>
//                       <select
//                         defaultValue={editTask.category}
//                         onChange={(e) => setEditTask({ ...editTask, category: e.target.value })}
//                         className="w-full p-2 border"
//                       >
//                         <option value="To-Do">To-Do</option>
//                         <option value="In Progress">In Progress</option>
//                         <option value="Done">Done</option>
//                       </select>
//                     </div>

//                     {/* Update Button */}
//                     <button type="submit" className="bg-blue-500 text-white w-full mt-5 rounded-md">
//                       Update Now
//                     </button>
//                   </form>
//                 </div>

//                 {/* Close Modal */}
//                 <label className="modal-backdrop" htmlFor={`modal_${task._id}`}>
//                   Close
//                 </label>
//               </div>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// };

// export default InProgress;




// // import React from "react";
// // import { useQuery } from "@tanstack/react-query";
// // import axios from "axios";
// // import Alert from "@mui/material/Alert";
// // import Swal from "sweetalert2";
// // const InProgress = () => {
// //   const {
// //     data = [],
// //     isLoading,

// //     error,
// //   } = useQuery({
// //     queryKey: ["tasks"],
// //     queryFn: async () => {
// //       const res = await axios.get("https://assinment-eleven-server-site.vercel.app/tasks");
// //       console.log("all data ", res.data);
// //       return res.data;
// //     },
// //   });

// //   const handelDeleted = async (id) => {
// //     try {
// //       // Show confirmation alert before deleting
// //       const result = await Swal.fire({
// //         title: "Are you sure?",
// //         text: "You won't be able to revert this!",
// //         icon: "warning",
// //         showCancelButton: true,
// //         confirmButtonColor: "#3085d6",
// //         cancelButtonColor: "#d33",
// //         confirmButtonText: "Yes, delete it!",
// //       });

// //       if (result.isConfirmed) {
// //         const res = await axios.delete(`https://assinment-eleven-server-site.vercel.app/tasks/${id}`);

// //         if (res.data.deletedCount > 0) {
// //           Swal.fire("Deleted!", "Your task has been deleted.", "success");
// //         } else {
// //           Swal.fire("Failed!", "Task deletion failed.", "error");
// //         }
// //       }
// //     } catch (error) {
// //       Swal.fire("Error!", "Something went wrong.", "error");
// //       console.error("Error deleting task:", error);
// //     }
// //   };

// //   const handleSubmitUpdate = async (e) => {
// //     e.preventDefault();
// //     const form =  e.target
// //     const title = form.title.value
// //     const Description = form.Description.value
// //     const Category = form.Category.value
// //     console.log(title, Description, 'my name is title');



// //   };

// //   if (isLoading) return <p>Loading...</p>;

// //   return (
// //     <div>
// //       <h2 className="text-xl font-bold mb-4">In Progress Tasks</h2>
// //       <ul>
// //         {data
// //           .filter((task) => task.category.trim() === "In Progress") // Ensure correct matching
// //           .map((task) => (
// //             <li key={task._id} className="border p-2 mb-2">
// //               <h3 className="font-semibold">Title: {task.title}</h3>
// //               <p>Description : {task.description}</p>

// //               <button
// //                 onClick={() => handelDeleted(task._id)}
// //                 className="text-red-500"
// //               >
// //                 Deleted
// //               </button>

// //               <label
// //                 onClick={() => handelEdit(task._id)}
// //                 htmlFor="my_modal_7"
// //                 className="text-green-500 ml-20"
// //               >
// //                 Edit
// //               </label>

// //               {/* Put this part before </body> tag */}
// //               <input type="checkbox" id="my_modal_7" className="modal-toggle" />
// //               <div className="modal" role="dialog">
// //                 <div className="modal-box">
// //                   <h3 className="text-lg font-bold">{task.title}</h3>
// //                   <div className="mb-4">
// //                     <label className="block mb-2">Title</label>
// //                     <input
// //                       type="text"
// //                       name="title"
// //                       defaultValue={task.title}
// //                       // onChange={(e) => setTitle(e.target.value)}
// //                       className="w-full p-2 border"
// //                       required
// //                     />
// //                   </div>
// //                   <div className="mb-4">
// //                     <label className="block mb-2">Description</label>
// //                     <textarea
// //                       value={task.description}
// //                       name="Description"
// //                       // onChange={(e) => setDescription(e.target.value)}
// //                       className="w-full p-2 border"
// //                       required
// //                     />
// //                   </div>

// //                   <div className="mb-4">
// //                     <label className="block mb-2">Category</label>
// //                     <select
// //                       value={task.category}
// //                       onChange={(e) => setCategory(e.target.value)}
// //                       className="w-full p-2 border"
// //                     >
// //                       <option value="To-Do">To-Do</option>
// //                       <option value="In Progress">In Progress</option>
// //                       <option value="Done">Done</option>
// //                     </select>
// //                     <button onClick={handleSubmitUpdate} className="bg-blue-500 text-white w-full mt-5 rounded-md">
// //                       Updated Now
// //                     </button>
// //                   </div>
// //                 </div>

// //                 <label className="modal-backdrop" htmlFor="my_modal_7">
// //                   Close
// //                 </label>
// //               </div>
// //             </li>
// //           ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default InProgress;
