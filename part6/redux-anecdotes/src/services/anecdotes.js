const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await fetch(baseUrl)
    
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const data = await res.json()
    return data
}

const createNew = async (content) => {
    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { content, votes: 0 } )
    })
    if (!res.ok) {
        throw new Error('failed to add anecdote')
    }
    return await res.json()
}

const update = async (newAnecdote) => {
    const res = await fetch (`${baseUrl}/${newAnecdote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote)
    })

    if (!res.ok) {
        throw new Error('cannot update the anecdote')
    }
    return await res.json()
}

export default { getAll, createNew, update }