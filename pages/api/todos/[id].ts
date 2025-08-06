import type { NextApiRequest, NextApiResponse } from 'next';
import { todos } from './data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const todoId = Number(id);
  if (isNaN(todoId)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }

  const index = todos.findIndex((t) => t.id === todoId);
  if (index === -1) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }

  if (req.method === 'PUT') {
    // toggle completed
    todos[index].completed = !todos[index].completed;
    res.status(200).json(todos[index]);
  } else if (req.method === 'DELETE') {
    todos.splice(index, 1);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
