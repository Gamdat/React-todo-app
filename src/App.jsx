import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import TodoList from './Component/TodoList';
import CreateTodo from './Component/CreateTodo';
import NotFound from './Component/NotFound';
import Home from './Component/Home';
import ErrorBoundary from './Component/Error/ErrorBoundary';
import ErrorPage from './Component/Error/ErrorPage';
import { ToastContainer } from 'react-toastify';
import TodoDetails from './Component/TodoDetails';


function App()  {
  

  return (
      <>
      <Router>
        <div className='App'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/todos" element={<TodoList/>} />
          <Route path="/create" element={<CreateTodo/>}/>
          <Route path="/create/:id" element={<CreateTodo/>}/>
          <Route path="/todo/:id" element={<TodoDetails/>}/>
          <Route path="/error-test" element={
            <ErrorBoundary>
              <ErrorPage/>
            </ErrorBoundary>
          }/>
          <Route path="*" element={<NotFound/>}/> 
        </Routes>
        </div>
      </Router>
      <ToastContainer/>
      </>
  );
};


export default App;
