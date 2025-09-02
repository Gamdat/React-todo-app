import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import TodosPage from "./Components/TodosPage";


export default function App() {
  return (

    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>

    </div>

  );

}



