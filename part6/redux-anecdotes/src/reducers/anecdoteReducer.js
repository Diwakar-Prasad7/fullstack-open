import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addNewAnecdote (state, action) {
      state.push(action.payload)
    },
    addVoteTo (state, action) {
      // const id = action.payload
      // const anToChange = state.find(an => an.id === id)
      // const changedAn = {...anToChange, votes: anToChange.votes + 1}
      const changedAn = action.payload
      return state.map(an => an.id === changedAn.id ? changedAn : an )
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

const { setAnecdotes, addNewAnecdote, addVoteTo } = anecdoteSlice.actions

export const initalAnecdotes = () => {
  return async ( dispatch ) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes)) 
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const res = await anecdoteService.createNew(content)
    dispatch(addNewAnecdote(res))
  }
}

export const voteAnecdote = (newAnecdote) => {
  return async (dispatch) => {
    const res = await anecdoteService.update(newAnecdote)
    dispatch(addVoteTo(res))
  }
}

export default anecdoteSlice.reducer
