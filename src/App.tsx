import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

const todos = todosFromServer.map(todo => {
  const user = usersFromServer.find(u => u.id === todo.userId);

  return { ...todo, user };
});

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [chosenUser, setChosenUser] = useState(0);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={() => {}}>
        <div className="field">
          <label htmlFor="title">
            Title:
            <input
              placeholder="Enter a title"
              type="text"
              id="title"
              data-cy="titleInput"
            />
          </label>

          {!title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:
            <select value={chosenUser} id="user" data-cy="userSelect">
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {!chosenUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
