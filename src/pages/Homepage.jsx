import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import { supabase } from "../client"
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs"
import { FaCheckCircle } from "react-icons/fa"; // if incomplete, show this
import { FaCircleXmark } from "react-icons/fa6"; // if complete, show this

function Homepage({token}) {

    /* navigation logic */

    

    /* to-do logic */

    const [todos, setTodos] = useState([])
    const [title, setTitle] = useState("")

    useEffect(() => {
        fetchTodos();
    }, [])

    async function addTodo() {
        if (!title.trim()) return;
        const {error} = await supabase.from("todos").insert([{title, completed: false, user_id: token.user.id}]);
        if (error) console.error(error);
        else {
            setTitle("");
            fetchTodos();
        }
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
                        <button onClick={() => updateTodo(todo.id, prompt("New title:", todo.title))}><BsFillPencilFill /></button>
                        </span>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a new todo"/> 
        <button onClick={addTodo}>Add</button>

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
