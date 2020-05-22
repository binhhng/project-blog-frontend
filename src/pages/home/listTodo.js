import React from 'react'

function Test(props) {
  console.log(props.name)
  return (
    <p>{props.name}</p>
  )
}

export default Test
