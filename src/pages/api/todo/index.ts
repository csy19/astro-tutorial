import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/db';

export const get: APIRoute = async () => {
  const todos = await prisma.todo.findMany();
  return new Response(JSON.stringify(todos), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const name = body.name;
  const todo = await prisma.todo.create({
    data: {
      name,
    },
  });
  return new Response(JSON.stringify(todo), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
