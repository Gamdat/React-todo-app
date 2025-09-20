import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./Components/TodoList";
import CreateTodo from "./Components/CreateTodo";
import NotFound from "./Components/NotFound";
import Home from "./Components/Home";
import ErrorBoundary from "./Components/Error/ErrorBoundary";
import ErrorPage from "./Components/Error/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // import styles for toast
import TodoDetails from "./Components/TodoDetails";
import "./App.css"

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/create" element={<CreateTodo />} />
            <Route path="/create/:id" element={<CreateTodo />} />
            <Route path="/todo/:id" element={<TodoDetails />} />

            {/* Test Error Boundary */}
            <Route
              path="/error-test"
              element={
                <ErrorBoundary>
                  <ErrorPage />
                </ErrorBoundary>
              }
            />
            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;


