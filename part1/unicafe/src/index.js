import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({good, neutral, bad}) => {
  if(good + neutral + bad === 0){
    return(
      <h4>No feedback given</h4>
    )
  }
  return(
    <div>
      {/* <h4>Good: {props.good}</h4>
      <h4>Neutral: {props.neutral}</h4>
      <h4>Bad: {props.bad}</h4>
      <h4>All: {props.all}</h4>
      <h4>Average: {props.average}</h4>
      <h4>Positive: {props.positive} % </h4> 
      */}

      <table>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={good + neutral + bad} />
        <StatisticLine text="Average" value={(good - bad) / (good + neutral + bad)} /> 
        <StatisticLine text="Positive" value={(good / (good + neutral + bad)) * 100} percent=" %" />
      </table>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  const {text, value} = props
  if(text === "Positive"){
    return(
      <tbody>
        <tr><td>{text}:</td><td>{value} %</td></tr>
      </tbody>
    )
  }
  return(
    <tbody>
      <tr><td>{text}:</td><td>{value}</td></tr>
    </tbody>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <br />
      
      {/* Not recommend */}
      {/* <button onClick={() => setGood(good + 1)}>Good</button> */}

      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <p />
			<h1>Statistics</h1>
			<p />
			<p />

			{/* 
      <h4>Good: {good}</h4>
      <h4>Neutral: {neutral}</h4>
      <h4>Bad: {bad}</h4>
      <h4>All: {good + neutral + bad}</h4>
      <h4>Average: {(good - bad) / (good + neutral + bad)}</h4>
      <h4>Positive: {(good / (good + neutral + bad)) * 100} % </h4> 
      */}

      {/* 
      <Statistics 
        good={good} neutral={neutral} bad={bad}
        all={good + neutral + bad}
        average={(good - bad) / (good + neutral + bad)}
        positive={(good / (good + neutral + bad)) * 100}
      /> 
      */}

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)