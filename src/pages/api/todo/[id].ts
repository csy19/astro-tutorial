import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/db';

export const del: APIRoute = async ({ params }) => {
  const id = Number(params.id);
  await prisma.todo.delete({ where: { id } });
  return new Response(null, {
    status: 200,
  });
};

export const patch: APIRoute = async ({ request, params }) => {
  const id = Number(params.id);
  const body = await request.json();
  const isComplete = body.isComplete;
  const todo = await prisma.todo.update({
    where: { id },
    data: { isComplete },
  });
  return new Response(JSON.stringify(todo), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
