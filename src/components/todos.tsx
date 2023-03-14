import type { Todo } from '@prisma/client';
import { useEffect, useState } from 'react';

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    const response = await fetch('/api/todo');
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
      await fetch('/api/todo', {
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

  const handleDelete = async (id: number) => {
    await fetch(`/api/todo/${id}`, {
      method: 'DELETE',
    });
    getTodos();
  };

  const handleChange = async (id: number, isComplete: boolean) => {
    await fetch(`/api/todo/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'appication/json',
      },
      body: JSON.stringify({ isComplete: !isComplete }),
    });
    getTodos();
  };

  return (
    <>
      <h2>Todo一覧</h2>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecorationLine: todo.isComplete ? 'line-through' : '',
            }}
          >
            <input
              type="checkbox"
              onChange={() => handleChange(todo.id, todo.isComplete)}
              defaultChecked={todo.isComplete}
            />
            {todo.name}
            <span
              style={{ paddingLeft: '0.5em', cursor: 'pointer' }}
              onClick={() => handleDelete(todo.id)}
            >
              X
            </span>
          </li>
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
