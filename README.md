# TaskFlow

TaskFlow is a robust full-stack Task Management web application built to help users organize their daily activities efficiently. It features secure user authentication and a comprehensive dashboard for managing tasks with various statuses.

## 🚀 Features

- **User Authentication**: Secure Repgistration and Login using JWT and bcrypt.
- **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
- **Task Status**: Categorize tasks as Pending, In Progress, or Completed.
- **Responsive Design**: Built with React and Tailwind CSS for a seamless experience across devices.
- **RESTful API**: scalable backend architecture using Node.js and Express.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Axios, React Router DOM
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: AsonWebTokens (JWT), Bcrypt.js

## 📋 Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (v14 or higher)
- **MySQL** (Local server or remote instance)
- **Git**

## ⚙️ Installation & Setup

Follow these steps to get the project up and running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Pratiksanap49/TaskFlow.git
cd TaskFlow
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` root directory and add the following configuration:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=taskflow_db
JWT_SECRET=your_super_secret_key
```

> **Note**: Replace `your_mysql_password` and `your_super_secret_key` with your actual MySQL password and a strong secret string.

#### Initialize the Database

Run the setup script to create the database and necessary tables:

```bash
node setupDb.js
```

#### Start the Server

```bash
node server.js
# OR if you have nodemon installed
npx nodemon server.js
```

The backend server should now be running on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd ../frontend
npm install
```

#### Start the Development Server

```bash
npm run dev
```

The application should now be accessible at `http://localhost:5173` (or the port shown in your terminal).

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and receive JWT

### Tasks
- `GET /api/tasks` - Get all tasks for the logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
