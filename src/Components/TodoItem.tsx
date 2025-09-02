import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onRename: (id: number, title: string) => void;
  onToggleLike: (id: number) => void;

}



export default function TodoItem({
  todo,
  onToggleComplete,
  onDelete,
  onRename,
  onToggleLike,
}: TodoItemProps) {
  return (
    <li className="todo-item" data-completed={todo.completed} data-liked={!!todo.liked}>
      <label className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onToggleComplete(todo.id, e.target.checked)}
        />
        <input
          className="title"
          value={todo.title}
          onChange={(e) => onRename(todo.id, e.target.value)}
        />
      </label>

      <div className="todo-actions">
        <button
          className={todo.liked ? "like active" : "like"}
          onClick={() => onToggleLike(todo.id)}
          aria-pressed={!!todo.liked}
          aria-label={todo.liked ? "Unlike" : "Like"}
          title={todo.liked ? "Unlike" : "Like"}
        >
          ♥
        </button>

        <button className="danger" onClick={() => onDelete(todo.id)}>

          Delete
        </button>
      </div>

    </li>

  );

}



