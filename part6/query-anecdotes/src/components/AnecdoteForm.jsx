import { useContext } from "react"
import NotificationContext from "../NotificationContext"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {

const queryClient = useQueryClient()

const newAnecMutation = useMutation({
  mutationFn: createAnecdote,
  onSuccess: (newAnecdote) => {
    const anecdotes = queryClient.getQueryData(['anecdotes'])

    queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
  }
})

  const { notificationDispatch } = useContext(NotificationContext);

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    if (content.length < 5) {
      notificationDispatch({
        type: 'SET',
        payload: 'Too short Anecdote, must have length 5 or more'
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
      return 
    }

    newAnecMutation.mutate({content, votes: 0})
    notificationDispatch({type: 'SET', payload: `anecdote '${content}' created`})

    setTimeout(()=> {
      notificationDispatch({type: 'CLEAR'})
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
