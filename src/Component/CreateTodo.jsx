import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "react-toastify";

function CreateTodo () {
const [title, setTitle] = useState("");
const queryClient = useQueryClient();

    const addTodoMutation = useMutation({
        mutationFn:(newTodo) =>
        fetch("https://jsonplaceholder.typicode.com/todos", {
            method: "POST",
            body: JSON.stringify(newTodo),
             header: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json()),
        onSuccess: () => {
                queryClient.invalidateQueries(["todos"]);
                setTitle("");
                toast.success("Todo Created Successfully");
               }
            });
            
            const handleSubmit= () => {
                if (!title.trim()) return;
                addTodoMutation.mutate({
                    userId: 1,
                    title: title,
                    completed: false,
                });
                addTodoMutation.mutate(newTodo);
            };

return (
    <div className="add-todo">
    <input value={title} onChange={(e) => setTitle(e.target.value)} 
    type="text" 
    placeholder="Enter your todo"/>
    <button onClick={handleSubmit} className="Add">Add Todo</button>
    </div>
);
}

export default CreateTodo;