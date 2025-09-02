import { useState } from "react";

interface TodoFormProps {
  onAdd: (title: string) => void;

}



export default function TodoForm({ onAdd }: TodoFormProps) {

  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle("");
  }



  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        aria-label="New todo title"

      />
      <button type="submit">Add</button>
    </form>
  );

}

