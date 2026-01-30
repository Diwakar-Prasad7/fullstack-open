import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { appendAnecdote } from "../reducers/anecdoteReducer";


const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    let content = event.target.anecdote.value
    event.target.anecdote.value = "";
    await dispatch(appendAnecdote(content))
    dispatch(setNotification(`You added new Anecdote: ${content}`, 5))
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
