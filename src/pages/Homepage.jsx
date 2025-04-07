import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import { supabase } from "../client"
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs"
import { FaCheckCircle } from "react-icons/fa"; // if incomplete, show this
import { FaCircleXmark } from "react-icons/fa6"; // if complete, show this
import Modal from "../components/Modal";

function Homepage({token}) {

    /* modal logic */

    const [showModal, setShowModal] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState(null);


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
        const {data, error} = await supabase.from("todos").select("*").order("created_at", {ascending: true});

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

  return (
    
    <div>

        <Navbar />

        <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
        

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
                {todos.filter((t) => !t.completed).map((todo) => (
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
                            setShowModal(true);
                        }}><BsFillPencilFill /></button>

                        </span>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <button onClick={() => {
            setNewTodo({ title: "", course: "", due_date: "", estimated_time: "" });
            setEditingTodoId(null);
            setShowModal(true);
        }}>
            Add To-do
        </button>

        <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit}
                todo={newTodo}
                setTodo={setNewTodo}
            />

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
                {todos.filter((t) => t.completed).map((todo) => (
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
  )
}

export default Homepage
