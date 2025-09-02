import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";
import TodoList from "./TodoList";

export default function TodosPage() {
  const [page, setPage] = useState(1);

  return (

    <div className="panel">
      <h1>Todos</h1>
      <Link to="/" className="back-btn">Back Home</Link>
      <ErrorBoundary fallback={<p> Could not load todos. Try again later.</p>}>
        <TodoList page={page} onPageChange={setPage} />
      </ErrorBoundary>
    </div>

  );

}

