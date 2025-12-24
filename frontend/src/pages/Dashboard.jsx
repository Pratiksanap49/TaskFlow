import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateUpdateTask = async (taskData) => {
        try {
            if (editingTask) {
                await api.put(`/tasks/${editingTask.id}`, taskData);
            } else {
                await api.post('/tasks', taskData);
            }
            setIsFormOpen(false);
            setEditingTask(null);
            fetchTasks();
        } catch (error) {
            console.error('Error saving task', error);
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${id}`);
                fetchTasks();
            } catch (error) {
                console.error('Error deleting task', error);
            }
        }
    };

    const openCreateModal = () => {
        setEditingTask(null);
        setIsFormOpen(true);
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in_progress': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold">TaskFlow</h1>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-4">Welcome, {user && user.name}</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
                        <button
                            onClick={openCreateModal}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add New Task
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                            <div key={task.id} className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-medium text-gray-900 truncate">{task.title}</h3>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                                            {task.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 h-20 overflow-y-auto">{task.description}</p>
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button
                                            onClick={() => openEditModal(task)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {isFormOpen && (
                <TaskForm
                    taskToEdit={editingTask}
                    onSave={handleCreateUpdateTask}
                    onCancel={() => setIsFormOpen(false)}
                />
            )}
        </div>
    );
};

export default Dashboard;
