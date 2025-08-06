// Shared in-memory data for todos
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

// In-memory storage (module-scoped, shared across API routes)
export const todos: Todo[] = [];
export let nextId = 1;

/**
 * Returns the next unique id and increments the internal counter.
 */
export function getNextId(): number {
  return nextId++;
}

