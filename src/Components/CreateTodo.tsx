import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";



// Define a type for a Todo

interface Todo {

  userId: number;

  id?: number; // optional because the server usually assigns this

  title: string;

  completed: boolean;

}



function CreateTodo() {

  const [title, setTitle] = useState<string>(""); // typed as string

  const queryClient = useQueryClient();



  const addTodoMutation = useMutation<Todo, Error, Omit<Todo, "id">>({

    mutationFn: async (newTodo) => {

      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {

        method: "POST",

        body: JSON.stringify(newTodo),

        headers: {

          "Content-Type": "application/json",

        },

      });



      if (!res.ok) {

        throw new Error("Failed to create todo");

      }



      return res.json();

    },

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["todos"] });

      setTitle("");

      toast.success("Todo Created Successfully");

    },

  });



  const handleSubmit = () => {

    if (!title.trim()) return;



    const newTodo: Omit<Todo, "id"> = {

      userId: 1,

      title,

      completed: false,

    };



    addTodoMutation.mutate(newTodo);

  };



  return (

    <div className="add-todo">

      <input

        value={title}

        onChange={(e) => setTitle(e.target.value)}

        type="text"

        placeholder="Enter your todo"

      />

      <button onClick={handleSubmit} className="Add">

        Add Todo

      </button>

    </div>

  );

}



export default CreateTodo;

