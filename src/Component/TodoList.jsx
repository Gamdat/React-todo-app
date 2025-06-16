import { useState } from 'react';
import { useQuery} from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {Link, useParams} from "react-router-dom";
import { toast } from 'react-toastify';



function fetchTodos() {
    return  fetch("https://jsonplaceholder.typicode.com/todos").then(res =>
        res.json()
    );
}

function TodoList() {
    const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 10;
        
const [searchTerm, setSearchTerm] = useState("");
const [filterStatus, setfilterStatus] = useState("all");
const {id} = useParams ()


     const queryClient = useQueryClient();
     const {data, isLoading, isError, error} = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    });



    {/*delete */}
    const deleteTodoMutation = useMutation({
        mutationFn: (id) =>
            fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE",
            }),
            onSuccess: () => {
                queryClient.invalidateQueries(["todos"]);
                toast.success("Todo Deleted Successfully");
            },
    })


    {/*update */}
    const updateMutation = useMutation({
        mutationFn:({id, updated}) =>
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify(updateTodo),
             header: {
                "Content-Type": "application/json",
            },
        }),
        onSuccess: () => {
                queryClient.invalidateQueries(["todos"]);
                toast.success("Todo Updated Successfully");
               }
            });
           


{/*search input */}
const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
};

{/*filter input */}
const handleFilterChange = (status) => {
    setfilterStatus(status);
    setCurrentPage(1);
}

{/*combine filters */}
const filteredTodos = data?.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm);
    const matchesStatus =
    filterStatus === "all" ||
    (filterStatus === "completed" && todo.completed) ||
    (filterStatus === "incomplete" && !todo.completed);
    return matchesSearch && matchesStatus;
})


const indexOfLastTodo = currentPage * todosPerPage;
const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
const currentTodos = filteredTodos?.slice(indexOfFirstTodo, indexOfLastTodo);

if (isLoading) return <p>Loading todos...</p>
    if (isError) return <p>Error: {error.message}</p>

    console.log(currentTodos);
   return (
    <main>
    <header>
    <h1 className="Header" >All Todos</h1>
    </header>

<button className='search'>
    {/*search box */}
    <input type="text"
    placeholder="Search by title"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}/>
</button>

    {/*filter buttons */}
    <div className='filterbtn'>
        <button className="allbtn"onClick={() =>handleFilterChange("all")}>All</button>
          <button className="completebtn"onClick={() =>handleFilterChange("completed")}>Completed</button>
            <button className="incompletebtn"onClick={() =>handleFilterChange("incomplete")}>Incomplete</button>
    </div>
    
    <ul className="todo-list">
        { filteredTodos.length === 0 ? (
            <p>No matching todos found</p>
        ) : (
       currentTodos.map((todo) => (
            <li key={todo.id}>
                <div className='link'> 
                 <h3>{todo.title}</h3>
              <Link to={`/todo/${todo.id}`}>
                View Details </Link>
                </div> 

{/*delete button */}
               <div className="buttons">
                <button onClick={() =>{
                    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
                    if (confirmDelete) {
                        deleteTodoMutation.mutate(todo.id)}
                    
                     toast.success("Todo Deleted Successfully");}
                } 
                className="delete">
                    Delete
                </button>

                <button className="Edit"
                onClick={ () => 
                    updateMutation.mutate({
                        id: todo.id,
updated: {
    userId: todo.userId,
    title: todo.title + " (Updated)",
    completed: todo.completed
}
                    })
                }
                >Edit Todo</button>
               </div>
            </li>
                   )
                    ))}
                
        
    </ul>
<div className='pagination-control'>
    <button
    className='prev' onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    >
        Prev
    </button>

    <span className='page'>Page {currentPage}</span>

    <button
    className='next' onClick={() => {
        const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    }}
disabled={indexOfLastTodo >= filteredTodos.length}
>
    Next
</button>
</div>
   
    </main>
   );

} 
export default TodoList;
