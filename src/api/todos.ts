import { http, httpPaginated } from "./client";
import type { Paginated, Todo } from "../types";



const RESOURCE = "/todos";
/** Server-side pagination via _page & _limit. JSONPlaceholder supports x-total-count on /todos */

export async function fetchTodos(
  page: number,
  limit: number
): Promise<Paginated<Todo>> {
  const { data, total } = await httpPaginated<Todo>(
    `${RESOURCE}?_page=${page}&_limit=${limit}`
  );
  return { data, total, page, limit };

}



export async function createTodo(payload: Pick<Todo, "title">): Promise<Todo> {
  // JSONPlaceholder fakes writes; returns created object with an id.
  return http<Todo>(RESOURCE, {
    method: "POST",
    body: JSON.stringify({ title: payload.title, completed: false }),
  });

}



export async function updateTodo(
  id: number,
  patch: Partial<Omit<Todo, "id">>
): Promise<Todo> {
  return http<Todo>(`${RESOURCE}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });

}


export async function deleteTodo(id: number): Promise<void> {
  await http(`${RESOURCE}/${id}`, { method: "DELETE", parse: "text" });

}



