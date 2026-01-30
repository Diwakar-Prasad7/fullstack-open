import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initalAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initalAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
