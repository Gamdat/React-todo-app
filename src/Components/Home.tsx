import { Link } from "react-router-dom";
import "./Home.css";



function Home() {
  return (
    <main>
      <div className="Header">
        <header>
          <h1 className="welcome">Welcome to Gloria's Todo App</h1>
          <p className="plan">....Plan it, Track it, Slay it</p>
        </header>

        <div className="Link">
          <button className="todo">
            <Link to="/todos">View All Todos</Link>
          </button>
          <br />

          <button className="create">
            <Link to="/create">Add New Todo</Link>
          </button>
          <br />

          <button className="errorpage">
            <Link to="/ErrorPage">Test Error Boundary</Link>
          </button>
          <br />

          <button className="notfound">
            <Link to="/NotFound">NotFound</Link>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;


