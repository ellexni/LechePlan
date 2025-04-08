import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import { supabase } from "../client"
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs"
import { FaCheckCircle } from "react-icons/fa"; // if incomplete, show this
import { FaCircleXmark } from "react-icons/fa6"; // if complete, show this
import Modal from "../components/Modal";

function Courses({token}) {
    /* modal logic */

    const [showModal, setShowModal] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [currentCourse, setCurrentCourse] = useState(null);


    /* to-do logic */

    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState({
        title: "",
        course: "",
        due_date: "",
        estimated_time: ""
    });


    useEffect(() => {
        fetchTodos();
    }, [])

    async function handleSubmit() {
        if (!newTodo.title.trim()) return;
    
        if (editingTodoId) {
            const { error } = await supabase
                .from("todos")
                .update({ ...newTodo })
                .eq("id", editingTodoId);
            if (error) console.error(error);
        } else {
            const { error } = await supabase.from("todos").insert([{
                ...newTodo,
                completed: false,
                user_id: token.user.id
            }]);
            if (error) console.error(error);
        }
    
        setNewTodo({ title: "", course: "", due_date: "", estimated_time: "" });
        setEditingTodoId(null);
        setShowModal(false);
        fetchTodos();
    }
    

    async function fetchTodos() {
        const {data, error} = await supabase.from("todos").select("*").order("course");

        if (error) console.error(error);
        else setTodos(data);
    }

    async function completeTodo(id) {
        await supabase.from("todos").update({completed: true}).eq("id", id);
        fetchTodos();
    }

    async function incompleteTodo(id) {
        await supabase.from("todos").update({completed: false}).eq("id", id);
        fetchTodos();
    }

    async function deleteTodo(id) {
        await supabase.from("todos").delete().eq("id", id);
        fetchTodos();
    }

    async function updateTodo(id, newTitle) {
        await supabase.from("todos").update({title: newTitle}).eq("id", id);
        fetchTodos();
    }

    const groupedTodos = todos.reduce((acc, todo) => {
        if (!acc[todo.course]) {
            acc[todo.course] = [];
        }
        acc[todo.course].push(todo);
        return acc;
    }, {})

  return (
    
    <div>

        <Navbar />

        <h3>{token.user.user_metadata.full_name}'s Todos</h3>
        
        {Object.keys(groupedTodos).length === 0 ? (
            <p>Nothing here yet</p>
        ) : (
            Object.keys(groupedTodos).map((course) => (
                <div key={course}>
                    <h2>{course}</h2>
                    <h2>Incomplete To-dos</h2>
        <table>        
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Course</th>
                    <th>Due</th>
                    <th>Estimated</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {todos.filter((t) => !t.completed && t.course === course).map((todo) => (
                    <tr key={todo.id}>
                        <td>{todo.title}</td>
                        <td>{todo.course}</td>
                        <td>{todo.due_date}</td>
                        <td>{todo.estimated_time}</td>
                        <td>
                        <span>
                        <button onClick={() => completeTodo(todo.id)}><FaCheckCircle /></button>
                        <button onClick={() => deleteTodo(todo.id)}><BsFillTrashFill /></button>
                        <button onClick={() => {
                            setNewTodo({
                                title: todo.title,
                                course: todo.course,
                                due_date: todo.due_date,
                                estimated_time: todo.estimated_time
                            });
                            setEditingTodoId(todo.id);
                            setCurrentCourse(course); // Set the current course
                            setShowModal(true);
                        }}><BsFillPencilFill /></button>


                        </span>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <button onClick={() => {
            setNewTodo({ title: "", course: course, due_date: "", estimated_time: "" });
            setEditingTodoId(null);
            setCurrentCourse(course); // Set the current course
            setShowModal(true);
        }}>
            Add To-do
        </button>


        {showModal && currentCourse === course && (
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit}
                todo={newTodo}
                setTodo={setNewTodo}
            />
        )}

        <h2>Complete To-dos</h2>
        <table>        
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Course</th>
                    <th>Due</th>
                    <th>Estimated</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {todos.filter((t) => t.completed && t.course === course).map((todo) => (
                    <tr key={todo.id}>
                        <td>{todo.title}</td>
                        <td>{todo.course}</td>
                        <td>{todo.due_date}</td>
                        <td>{todo.estimated_time}</td>
                        <td>
                        <span>
                        <button onClick={() => incompleteTodo(todo.id)}><FaCircleXmark /></button>
                        <button onClick={() => deleteTodo(todo.id)}><BsFillTrashFill /></button>
                        <button onClick={() => updateTodo(todo.id, prompt("New title:", todo.title))}><BsFillPencilFill /></button>                        
                        </span>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
                </div>
            ))
        )}




        

    </div>
    )
}

export default Courses