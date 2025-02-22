import InProgress from "../InProgrece/InProgress";
import ToDo from "../ToDo/ToDo";
import Done from "../Done/Done";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
const ManageTask = () => {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("https://assinment-eleven-server-site.vercel.app/tasks");
      console.log("all data ", res.data);
      return res.data;
    },
  });

  const handelDeleted = async (id) => {
    try {
      // Show confirmation alert before deleting
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
        const res = await axios.delete(`https://assinment-eleven-server-site.vercel.app/tasks/${id}`);

        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
        } else {
          Swal.fire("Failed!", "Task deletion failed.", "error");
        }
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
      console.error("Error deleting task:", error);
    }
  };
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3">
      <div>
        helo
        <ul>
          {data
            .filter((task) => task.category.trim() === "To-Do") // Ensure correct matching
            .map((task) => (
              <li key={task._id} className="border p-2 mb-2">
                <h3 className="font-semibold">Title: {task.title}</h3>
                <p>Description : {task.description}</p>

                <button
                  onClick={() => handelDeleted(task._id)}
                  className="text-red-500"
                >
                  Deleted
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div>
        helo
        <ul>
          {data
            .filter((task) => task.category.trim() === "Done") // Ensure correct matching
            .map((task) => (
              <li key={task._id} className="border p-2 mb-2">
                <h3 className="font-semibold">Title: {task.title}</h3>
                <p>Description : {task.description}</p>

                <button
                  onClick={() => handelDeleted(task._id)}
                  className="text-red-500"
                >
                  Deleted
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div>
        helo
        <ul>
          {data
            .filter((task) => task.category.trim() === "Done") // Ensure correct matching
            .map((task) => (
              <li key={task._id} className="border p-2 mb-2">
                <h3 className="font-semibold">Title: {task.title}</h3>
                <p>Description : {task.description}</p>

                <button
                  onClick={() => handelDeleted(task._id)}
                  className="text-red-500"
                >
                  Deleted
                </button>
              </li>
            ))}
        </ul>
      </div>

     
    </div>
  );
};

export default ManageTask;



 {/* <InProgress></InProgress>
<ToDo></ToDo>
<Done></Done> */}





