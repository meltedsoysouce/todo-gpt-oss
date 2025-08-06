import type { NextApiRequest, NextApiResponse } from 'next';
import { todos, getNextId } from './data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return all todos
    res.status(200).json(todos);
  } else if (req.method === 'POST') {
    const { title } = req.body as { title?: string };
    if (!title || typeof title !== 'string') {
      res.status(400).json({ error: 'Title is required' });
      return;
    }
    const newTodo = { id: getNextId(), title, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
