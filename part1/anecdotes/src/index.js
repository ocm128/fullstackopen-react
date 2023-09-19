import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const AnecdoteOfDay = (props) => {
  const {anecdotes, votes, selected} = props;
  let maxIndex = 0;

  for (let i = 0; i < anecdotes.length; i++) {
    if(votes[maxIndex] < votes[i]){
      maxIndex = i;
    }
  }
 
  return(
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
    </div>
  )
}

const AnecdoteMostVoted = ({anecdotes, votes}) => {
  let maxIndex = 0;

  for (let i = 0; i < anecdotes.length; i++) {
    if(votes[maxIndex] < votes[i]){
      maxIndex = i;
      console.log(maxIndex + " maxIndex")
    }
  }
  if(votes[maxIndex] === 0){
    return(
      <p>No votes yet</p>
    )
  }
  return (
    <div>
      <h2>Anecdotes with most votes</h2>
      <p>{anecdotes[maxIndex]}</p>
      has {votes[maxIndex]} votes
    </div>
  )
}



const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    return setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const addVote = () => {
		const copy = [...votes]
		copy[selected]++
    console.log(copy + " en incrementVote")
		setVote(copy)
  }

  return (
    <div>
       <AnecdoteOfDay anecdotes={anecdotes} votes={votes} selected={selected} />
      {/* <Button handleClick={() => setSelected(Math.floor(Math.random()*anecdotes.length))} text="new anecdote"/> */}
      <Button handleClick={nextAnecdote} text="New anecdote" />
      <Button handleClick={addVote} text="Vote" />
      <AnecdoteMostVoted anecdotes={anecdotes} votes={votes}> </AnecdoteMostVoted>
    </div>
    
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
