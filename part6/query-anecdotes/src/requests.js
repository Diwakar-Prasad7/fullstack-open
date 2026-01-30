const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const res = await fetch (baseUrl)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return await res.json()
}

export const createAnecdote = async (newAnecdote) => {
    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newAnecdote)
    })

    if (!res.ok) {
        throw new Error ('failed to add new anecdote')
    }
    return await res.json()
}

export const updateAnecdote = async (updatedAnecdote) => {
    const res = await fetch (`${baseUrl}/${updatedAnecdote.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedAnecdote)
    })

    if (!res.ok){
        throw new Error('Failed to update the anecdote')
    }
    return await res.json()
}