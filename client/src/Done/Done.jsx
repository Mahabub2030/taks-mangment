import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const ToDo = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("https://server-pied-omega.vercel.app/tasks");
      return res.data;
    },
  });

  const [tasks, setTasks] = useState([]);

  React.useEffect(() => {
    if (data.length) {
      setTasks(data.filter((task) => task.category.trim() === "Done"));
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
          setTasks(tasks.filter((task) => task._id !== id));
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

    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, movedTask);

    setTasks(newTasks);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">To-Do</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="p-4 border rounded"
            >
              {tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border p-2 mb-2  rounded cursor-move"
                    >
                      <h3 className="font-semibold">Title: {task.title}</h3>
                      <p>Description: {task.description}</p>
                      <button
                        onClick={() => handleDeleted(task._id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
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

export default ToDo;

// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import Swal from "sweetalert2";


// const Done = () => {
//     const { data = [], isLoading, error } = useQuery({
//         queryKey: ["tasks"],
//         queryFn: async () => {
//           const res = await axios.get("https://assinment-eleven-server-site.vercel.app/tasks");
//           console.log('all data ', res.data ); 
//           return res.data;
//         },
//       });
      
//   const handelDeleted = async (id) => {
//     try {
//       // Show confirmation alert before deleting
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
//         } else {
//           Swal.fire("Failed!", "Task deletion failed.", "error");
//         }
//       }
//     } catch (error) {
//       Swal.fire("Error!", "Something went wrong.", "error");
//       console.error("Error deleting task:", error);
//     }
//   };
//       if (isLoading) return <p>Loading...</p>;
//     return (
//         <div>
//         <h2 className="text-xl font-bold mb-4">Done</h2>
//         <ul>
//           {data
//             .filter((task) => task.category.trim() === "Done") // Ensure correct matching
//             .map((task) => (
//               <li key={task._id} className="border p-2 mb-2">
//                 <h3 className="font-semibold">Title: {task.title}</h3>
//                 <p>Description : {task.description}</p>

                
//               <button
//                 onClick={() => handelDeleted(task._id)}
//                 className="text-red-500"
//               >
//                 Deleted
//               </button>
//               </li>
//             ))}
//         </ul>
//       </div>
//     );
// };

// export default Done;