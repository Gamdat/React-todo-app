import { useParams, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";



// Define the Todo type

interface Todo {

  userId: number;

  id: number;

  title: string;

  completed: boolean;

}



const TodoDetails = () => {

  // params are strings or undefined

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();



  const {

    data: todo,

    isLoading,

    isError,

    error,

  } = useQuery<Todo, Error>({

    queryKey: ["todo", id],

    queryFn: async () => {

      if (!id) throw new Error("No ID provided");

      const res = await axios.get<Todo>(

        `https://jsonplaceholder.typicode.com/todos/${id}`

      );

      return res.data;

    },

  });



  if (isLoading) return <p>Loading todo details...</p>;

  if (isError) return <p>Error fetching todo details: {error.message}</p>;



  return (

    <section>

      <div className="todo-details">

        <h2>Todo Details</h2>

        <p>

          <strong>ID:</strong> {todo?.id}

        </p>

        <p>

          <strong>Title:</strong> {todo?.title}

        </p>

        <p>

          <strong>Status:</strong> {todo?.completed ? "Completed" : "Not Completed"}

        </p>

        <button onClick={() => navigate(-1)} className="back-button">

          Back to List

        </button>

      </div>

    </section>

  );

};



export default TodoDetails;