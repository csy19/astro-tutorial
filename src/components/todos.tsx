import type { Todo } from '@prisma/client';
import { useEffect, useState } from 'react';

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    const response = await fetch('/api/todos');
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
      await fetch('/api/todos', {
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
    //TODO: DELETEが動かない
    await fetch(`/api/todos?id=${id}`, {
      method: 'DELETE',
    });
    console.log(id);
    getTodos();
  };

  return (
    <>
      <h2>Todo一覧</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
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
