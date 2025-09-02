import { useCallback, useEffect, useMemo, useState } from "react";

const KEY = "todo-liked-set-v1";

function read(): Set<number> {

  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    const arr: number[] = JSON.parse(raw);
    return new Set(arr);
  } catch {
    return new Set();

  }

}

function write(set: Set<number>) {
  localStorage.setItem(KEY, JSON.stringify(Array.from(set)));

}

/** Client-side likes persisted in localStorage */

export function useLikes() {
  const [likedSet, setLikedSet] = useState<Set<number>>(() => read());

  useEffect(() => {
    write(likedSet);
  }, [likedSet]);

  const isLiked = useCallback((id: number) => likedSet.has(id), [likedSet]);
  const toggleLike = useCallback((id: number) => {
    setLikedSet(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  }, []);

  const clearLikes = useCallback(() => setLikedSet(new Set()), []);

  return useMemo(
    () => ({ likedSet, isLiked, toggleLike, clearLikes }),
    [likedSet, isLiked, toggleLike, clearLikes]

  );

}