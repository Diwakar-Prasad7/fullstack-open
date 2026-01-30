import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
      if (state.filter === 'ALL') {
        return state.anecdotes
      }
      return state.anecdotes.filter(an =>
      an.content.toLowerCase().includes(state.filter.toLowerCase())
    ) }
  )
    const dispatch = useDispatch()

    const vote = id => {
    let an = anecdotes.find(n => n.id === id)
    let updateAnecdote = {...an, votes: an.votes + 1}
    dispatch(voteAnecdote(updateAnecdote))
    dispatch(setNotification(`You voted '${an.content}'`, 5))
  }
 
    return (
        <div>
      {[...anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
        </div>
    )
}

export default AnecdoteList