import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "../api/todos";
import type { Todo } from "../types";
import { useEffect, useMemo } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import Pagination from "./Pagination";
import { useLikes } from "../hooks/useLikes";



const LIMIT = 10;



interface Props {
  page: number;
  onPageChange: (p: number) => void;

}



export default function TodoList({ page, onPageChange }: Props) {
  const queryClient = useQueryClient();
  const { isLiked, toggleLike, likedSet } = useLikes();



  // Fetch paginated todos

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos", page, LIMIT],
    queryFn: () => fetchTodos(page, LIMIT),
    staleTime: 30_000,
    keepPreviousData: true,

  });



  // Merge likes client-side

  const todos = useMemo<Todo[] | undefined>(() => {
    if (!data) return undefined;
    return data.data.map(t => ({ ...t, liked: isLiked(t.id) }));
  }, [data, isLiked]);



  // Create

  const addMutation = useMutation({
    mutationFn: (title: string) => createTodo({ title }),
    onSuccess: (created) => {

      // Optimistically put the new item into page 1 cache

      queryClient.setQueryData(["todos", 1, LIMIT], (old: any) => {

        if (!old) return old;

        return {

          ...old,

          data: [{ ...created, id: created.id ?? Date.now() }, ...old.data].slice(0, LIMIT),

          total: old.total + 1,

        };

      });

      // Also refresh current page if needed

      queryClient.invalidateQueries({ queryKey: ["todos"] });

    },

  });



  // Update (rename or toggle complete)

  const updateMutation = useMutation({

    mutationFn: ({ id, patch }: { id: number; patch: Partial<Todo> }) =>

      updateTodo(id, patch),

    onMutate: async ({ id, patch }) => {

      const keys = queryClient.getQueryCache().findAll({ queryKey: ["todos"] }).map(q => q.queryKey);

      const snapshots = keys.map(key => {

        const prev = queryClient.getQueryData<any>(key);

        if (prev) {

          const next = {

            ...prev,

            data: prev.data.map((t: Todo) => (t.id === id ? { ...t, ...patch } : t)),

          };

          queryClient.setQueryData(key, next);

        }

        return { key, prev };

      });

      return { snapshots };

    },

    onError: (_err, _vars, ctx) => {

      ctx?.snapshots?.forEach((s: any) => queryClient.setQueryData(s.key, s.prev));

    },
onSuccess: () => {

  alert(" Todo updated successfully!");

  queryClient.invalidateQueries({ queryKey: ["todos"] });

},
    onSettled: () => {

      queryClient.invalidateQueries({ queryKey: ["todos"] });

    },

  });



  // Delete

  const deleteMutation = useMutation({

    mutationFn: (id: number) => deleteTodo(id),

    onMutate: async (id) => {

      const keys = queryClient.getQueryCache().findAll({ queryKey: ["todos"] }).map(q => q.queryKey);

      const snapshots = keys.map(key => {

        const prev = queryClient.getQueryData<any>(key);

        if (prev) {

          const next = {

            ...prev,

            data: prev.data.filter((t: Todo) => t.id !== id),

            total: Math.max(0, prev.total - 1),

          };

          queryClient.setQueryData(key, next);

        }

        return { key, prev };

      });

      return { snapshots };

    },

    onError: (_err, _id, ctx) => {

      ctx?.snapshots?.forEach((s: any) => queryClient.setQueryData(s.key, s.prev));

    },
onSuccess: () => {

  alert(" Todo deleted successfully!");

  queryClient.invalidateQueries({ queryKey: ["todos"] });

},


    onSettled: () => {

      queryClient.invalidateQueries({ queryKey: ["todos"] });

    },

  });



  // Keep likes in sync visually when user toggles like on the current page

  function handleToggleLike(id: number) {

    toggleLike(id);

    // reflect in visible cache without refetch

    const keys = queryClient.getQueryCache().findAll({ queryKey: ["todos"] }).map(q => q.queryKey);

    keys.forEach(key => {

      const prev = queryClient.getQueryData<any>(key);

      if (prev) {

        queryClient.setQueryData(key, {

          ...prev,

          data: prev.data.map((t: Todo) =>

            t.id === id ? { ...t, liked: !t.liked } : t

          ),

        });

      }

    });

  }



  useEffect(() => {

    // When likedSet changes (e.g., from another tab), reflect it in current data

    const keys = queryClient.getQueryCache().findAll({ queryKey: ["todos"] }).map(q => q.queryKey);

    keys.forEach(key => {

      const prev = queryClient.getQueryData<any>(key);

      if (prev) {

        queryClient.setQueryData(key, {

          ...prev,

          data: prev.data.map((t: Todo) => ({ ...t, liked: likedSet.has(t.id) })),

        });

      }

    });

  }, [likedSet, queryClient]);



  if (isLoading) return <p className="muted">Loading…</p>;

  if (isError) throw error as Error;



  const total = data?.total ?? 0;



  return (

    <div className="panel">

      <TodoForm onAdd={(title) => addMutation.mutate(title)} />



      <ul className="todo-list">

        {todos?.map((todo) => (

          <TodoItem

            key={todo.id}

            todo={todo}

            onToggleComplete={(id, completed) =>

              updateMutation.mutate({ id, patch: { completed } })

            }

            onDelete={(id) => deleteMutation.mutate(id)}

            onRename={(id, title) => updateMutation.mutate({ id, patch: { title } })}

            onToggleLike={handleToggleLike}

          />

        ))}

      </ul>



      <Pagination

        page={page}

        limit={LIMIT}

        total={total}

        onPageChange={onPageChange}

      />

    </div>

  );

}



