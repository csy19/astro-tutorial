import type { APIRoute } from 'astro';
import { prisma } from '../../lib/db';

export const get: APIRoute = async () => {
  const todos = await prisma.todo.findMany();
  return new Response(JSON.stringify(todos), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
