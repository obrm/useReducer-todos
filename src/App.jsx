import { useReducer } from 'react';

// Action Constants
const ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
};

// Reducer Function
const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload.text,
          completed: false
        }];
    case ACTIONS.TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );
    case ACTIONS.REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload.id);
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(todoReducer, []);

  const addTodo = text => {
    dispatch({ type: ACTIONS.ADD_TODO, payload: { text } });
  };

  const toggleTodo = id => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id } });
  };

  const removeTodo = id => {
    dispatch({ type: ACTIONS.REMOVE_TODO, payload: { id } });
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="container">
        <input
          type="text"
          placeholder="Add a task"
          onKeyDown={e => {
            if (e.key === 'Enter' && e.target.value) {
              addTodo(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <ul>
          {state.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
