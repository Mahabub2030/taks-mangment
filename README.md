Task Management Application
Overview
The Task Management Application is a tool that helps users manage and track their tasks efficiently. The app allows users to perform the following tasks:

Firebase Authentication for Google sign-in.
Add, edit, delete, and reorder tasks.
Task categorization: To-Do, In Progress, and Done.
Real-time syncing ensures that changes are instantly reflected in the frontend.
The app is responsive and suitable for both desktop and mobile users.
Key Features

1. Task Management
   Users can add, edit, delete, and reorder tasks.
   Tasks are categorized into:
   To-Do
   In Progress
   Done
   Users can drag-and-drop tasks from one category to another.
   Changes are instantly saved to the database, ensuring real-time persistence.
2. Database & Persistence
   MongoDB is used to store tasks.
   Real-time syncing ensures that when a user refreshes or reopens the app, the tasks are displayed in their last known order.
   When a task is deleted, it is permanently removed from the database.
3. Frontend
   Built with React and Vite.js.
   react-beautiful-dnd (or similar drag-and-drop library) is used for task reordering.
   The UI is modern, minimalistic, and responsive.
4. Backend
   CRUD operations are handled using an Express.js API.
   API endpoints:
   POST /tasks: Add a new task.
   GET /tasks: Retrieve all tasks for the logged-in user.
   PUT /tasks/:id: Update task title, description, or category.
   DELETE /tasks/:id: Delete a task.
   Challenges Faced
5. Drag-and-Drop Functionality
   Problem: Ensuring that the drag-and-drop feature works smoothly on both mobile and desktop.
   Solution: Integrated react-beautiful-dnd to provide a smooth drag-and-drop experience on both desktop and mobile platforms.
6. Database Persistence
   Problem: Maintaining the task order and ensuring real-time syncing with the database, even after refreshing the page.
   Solution: I implemented MongoDB Change Streams and applied optimistic UI updates, ensuring that changes are reflected immediately on the frontend.
7. Authentication Flow
   Problem: Implementing a secure user authentication and sign-in flow.
   Solution: Used Firebase Authentication for easy sign-in and stored user information in MongoDB upon the first login.
   Installation
   Prerequisites
   Node.js
   MongoDB (local or cloud)
   Firebase project (with Google Sign-In enabled)
   Steps
   Clone the repository:

git clone https://github.com/Mahabub2030/taks-mangment
cd task-management-app
Install dependencies:

npm install
Configure environment variables (MongoDB URI, Firebase configuration).

Run the backend:

npm run server
Run the frontend:

npm run dev
Open the app in the browser: https://server-pied-omega.vercel.app

Tech Stack
Frontend: React, Vite.js, react-beautiful-dnd
Backend: Express.js, MongoDB, Firebase Authentication
Real-time Syncing: MongoDB Change Streams
Dependencies
Here are the dependencies used in the project:

@emotion/react: ^11.14.0

@emotion/styled: ^11.14.0

@hello-pangea/dnd: ^18.0.1

@lottiefiles/react-lottie-player: ^3.5.4

@mui/material: ^6.4.5

@tanstack/react-query: ^5.66.8

axios: ^1.7.9

date-fns: ^4.1.0

firebase: ^11.1.0

lottie-react: ^2.4.0

react: ^18.3.1

react-beautiful-dnd: ^13.1.1

react-datepicker: ^7.5.0

react-dom: ^18.3.1

react-draggable: ^4.4.6

react-hook-form: ^7.54.2

react-hot-toast: ^2.4.1

react-icons: ^5.4.0

react-router-dom: ^7.0.2

sweetalert2: ^11.15.3

License
Live Demo
You can check out the live version of the Task Management Application here.
