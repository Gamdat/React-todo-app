# React + Vite
This is a Todo application that allows user to manage their tasks efficiently. it uses data fetched from the JSONPlaceholder API and it's built with:
- React 19
- React Router
- Tanstack Query
- Daisy UI
- JSONPlaceholder API
- Vanilla CSS

## Features
- View all todos
- Edit todos
- Create new todo
- Delete existing todo
- View todo details
- Pagination for efficient browsing
- Search and filtering by title or completion status
- Nested routing
- Error Boundary
- 404 Page
- Optimistic updates with Tanstack Query
- UI state feedback (loading, success, error)

## Installation and Setup instructions
- Clone the repo
- Cd react-todo-app
- npm install
- npm run dev
The app will run at https://localhost:5173

## Architecture & Folder Structure
- src/
    assets
    Components/
       Home.css
       Home.jsx
       CreateTodo.jsx
       NotFound.jsx
       TodoDetails.jsx
       TodoList.jsx
       App.css
       App.jsx
       main.jsx
       index.css
       Error/
           ErrorBoundary.jsx
           ErrorPage.jsx

## API Documentation and usage
This application uses the JSONPlaceholder fake rest API to stimulate a real backend
Base URL: https://jsonplaceholder.typicode.com/todos

- GET - to fetch todos
- POST - to create new todo
- PUT - to update existing todo
DELETE - to delete a todo

## Known Issues
- JSONPlaceholder is a mock API, data changes are not persistent

## Future Impprovement
- Use real backend
- Add authentication with firebase


## ScreenShots

### Add Todo
![Add Todo Screenshot] (./assets/addtodo.jpeg)


### filteing Todo
![Filtering Screenshot] (./assets/filteringByStatus.jpeg)


### Pagination
![pagination  Screenshot] (./assets/pagination.jpeg)


### Todo Details
![ Todo  Details Screenshot] (./assets/todoDetails.jpeg)


### View Todo
![View Todo Screenshot] (./assets/viewTodo.jpeg)



### 404
![404 page Screenshot] (./assets/404.jpeg)
