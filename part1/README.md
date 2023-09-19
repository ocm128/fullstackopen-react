### Parts 1.1 and 1.2

```js
import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <div>
      <h1>
        <p>{props.course}</p>
      </h1>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>

      {/*  PART 1.1 step 1
      <p>{props.part1}: {props.exercises1}</p>
      <p>{props.part2}: {props.exercises2}</p>
      <p>{props.part3}: {props.exercises3}</p> 
      */}

      {/* PART 1.2  step 2*/}
      <Part part={props.part1} exercise={props.exercises1}></Part>
      <Part part={props.part2} exercise={props.exercises2}></Part>
      <Part part={props.part3} exercise={props.exercises3}></Part>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.part}: {props.exercise}</p>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises: {props.total}</p>
    </div>
  )
}

const App = () => {

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} 
                exercises2={exercises2} exercises3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} /> 
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

```

### Part 1.3 

```js

import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <div>
      <h1>
        <p>{props.course}</p>
      </h1>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part part={props.part1} exercise={props.exercises1}></Part>
      <Part part={props.part2} exercise={props.exercises2}></Part>
      <Part part={props.part3} exercise={props.exercises3}></Part>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.part}: {props.exercise}</p>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises: {props.total}</p>
    </div>
  )
}

const App = () => {

  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1.name} part2={part2.name} part3={part3.name} exercises1={part1.exercises} 
                exercises2={part2.exercises} exercises3={part3.exercises} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} /> 
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

```


### Part 1.4

```js

import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <div>
      <h1>
        <p>{props.course}</p>
      </h1>
    </div>
  )
}

const Content = (props) => {
  console.log('Content props', props)
  return(
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercise={props.parts[1].exercises} />
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.part}: {props.exercise}</p>
    </div>
  )
}

const Total = (props) => {
  console.log("total props", props)
  return(
    <div>
      <p>Number of exercises: {props.total[0].exercises + props.total[1].exercises +
                                 props.total[2].exercises}</p>
    </div>
  )
}

const App = () => {

  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

```

### Part 1.5

```js

import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <div>
      <h1>
        <p>{props.course}</p>
      </h1>
    </div>
  )
}

const Content = (props) => {
  console.log("Content props", props)
  return(
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercise={props.parts[1].exercises} />
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.part}: {props.exercise}</p>
    </div>
  )
}

const Total = (props) => {
  console.log("total props", props)
  return(
    <div>
      <p>Number of exercises: {props.total[0].exercises + props.total[1].exercises +
                                 props.total[2].exercises}</p>
    </div>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


