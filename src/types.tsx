export interface Todo {
userId?: number;
  id: number;
  title: string;
  completed: boolean;

  /** Client-side only */
  liked?: boolean;

}



export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}