import type { Todo } from '@prisma/client';
import { useEffect, useState } from 'react';

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    const response = await fetch('http://localhost:3000/api/todos');
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;
    const name = target.value;

    if (event.key === 'Enter' && name) {
      console.log(name);
      await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'appication/json',
        },
        body: JSON.stringify({ name }),
      });
      target.value = '';
      getTodos();
    }
  };

  return (
    <>
      <h2>Todo一覧</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
      {/* <form action="" method="post"> */}
      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="ToDoを追加する"
      />
      {/* <button>enter</button> */}
      {/* </form> */}
    </>
  );
};

export default Todos;
