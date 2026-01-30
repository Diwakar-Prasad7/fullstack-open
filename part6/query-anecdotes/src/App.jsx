import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {

  const queryClient = useQueryClient()

  const updateAnecMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnec) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']) || []

      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map(a => a.id === updatedAnec.id ? updatedAnec : a)
      )
    }
  })

  const { notificationDispatch } = useContext(NotificationContext);

  const handleVote = (anecdote) => {
    updateAnecMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({type: 'SET', payload:`anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      notificationDispatch({type: 'CLEAR'})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false
  })

  if (result.isLoading) {
    return <div>Loading anecdotes...</div>
  }

  // Handle error state
  if (result.isError) {
    return <div>
      Anecdote service not available due to problems in server
    </div>
  }


  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {[...anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App