import { Link } from "react-router-dom";


export default function Home() {

  return (

    <div className="panel">
      <h1>Welcome to the Todo App </h1>
      <p>Navigate using the menu to view or manage your todos.</p>
   
   <div className="link-container">
    <Link to="/todos">Go to Todos</Link>
        <Link to="/notFound">Not Found</Link>
    </div>
    </div>

  );

}




