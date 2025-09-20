import { useState, ChangeEvent } from "react";
import {useQuery, useMutation, useQueryClient,} from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// Define Todo type
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Fetch all todos
async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
}

function TodoList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const todosPerPage = 10;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "incomplete">("all");

  const queryClient = useQueryClient();

  // Query to fetch todos
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // Delete Todo
  const deleteTodoMutation = useMutation<void, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete todo");
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo Deleted Successfully");
    },
  });



  // Update Todo

  const updateMutation = useMutation<void, Error, { id: number; updated: Todo }>({
    mutationFn: async ({ id, updated }) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(updated),
        headers: {
          "Content-Type": "application/json",
        },

      });

      if (!res.ok) {
        throw new Error("Failed to update todo");
      }

    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo Updated Successfully");
    },

  });



  // Handle search

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };



  // Handle filter
  const handleFilterChange = (status: "all" | "completed" | "incomplete") => {
    setFilterStatus(status);
    setCurrentPage(1);
  };



  // Combine filters

  const filteredTodos = todos?.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm);
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "completed" && todo.completed) ||
      (filterStatus === "incomplete" && !todo.completed);
    return matchesSearch && matchesStatus;
  }) ?? [];



  // Pagination

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  if (isLoading) return <p>Loading todos...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <main>
      <header>
        <h1 className="Header">All Todos</h1>
      </header>



      {/* Search Box */}

      <button className="search">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </button>



      {/* Filter Buttons */}
      <div className="filterbtn">
        <button className="allbtn" onClick={() => handleFilterChange("all")}>
          All
        </button>
        <button className="completebtn" onClick={() => handleFilterChange("completed")}>
          Completed
        </button>
        <button className="incompletebtn" onClick={() => handleFilterChange("incomplete")}>
          Incomplete
        </button>
      </div>


      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <p>No matching todos found</p>
        ) : (
          currentTodos.map((todo) => (
            <li key={todo.id}>
              <div className="link">
                <h3>{todo.title}</h3>
                <Link to={`/todo/${todo.id}`}>View Details</Link>
              </div>


              {/* Buttons */}
              <div className="buttons">
                {/* Delete */}
                <button
                  onClick={() => {
                    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
                    if (confirmDelete) {
                    deleteTodoMutation.mutate(todo.id);
                    }
                  }}
                  className="delete"
                >
                  Delete
                </button>



                {/* Update */}
                <button
                  className="Edit"
                  onClick={() =>
                    updateMutation.mutate({
                      id: todo.id,
                      updated: {
                        userId: todo.userId,
                        id: todo.id,
                        title: todo.title + " (Updated)",
                        completed: todo.completed,
                      },
                    })
                  }
                >
                  Edit Todo
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Pagination Controls */}
      <div className="pagination-control">
        <button
          className="prev"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span className="page">Page {currentPage}</span>

        <button
          className="next"
          onClick={() => {
            const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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

