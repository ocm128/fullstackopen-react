import React from "react";

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => (
        <p key={part.id}>{part.name} : {part.exercises}</p>
      ))}
    </div>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((accumulator, currentValue) => 
    //O is a value to which accumulator is initialized the first time the callback is called.
    accumulator + currentValue.exercises, 0)
  return (
    <p><b>Total of exercises: {total}</b></p>
  )
}


const course = ({ course }) => {
  //console.log(course, "inside course")
  return (
    course.map(course =>
    <div key={course.id}>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
    )
  )
}

export default course