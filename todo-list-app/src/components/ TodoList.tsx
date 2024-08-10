import React from 'react';
import { Todo } from '../types';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, editTodo, deleteTodo }) => {
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [editText, setEditText] = React.useState<string>('');

  const handleEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSave = (id: number) => {
    editTodo(id, editText);
    setEditingId(null);
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {editingId === todo.id ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
          )}
          <button onClick={() => handleEdit(todo.id, todo.text)}><FaEdit /></button>
          <button onClick={() => deleteTodo(todo.id)}><FaTrashAlt /></button>
          {editingId === todo.id && <button onClick={() => handleSave(todo.id)}>Save</button>}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
