import React, { useState } from 'react'
import Test from './listTodo'

function Home(props) {
  const [valueInput, setValueInput] = useState('')
  const [todoList, setTodoList] = useState('cong viec 1')

  // let todoList = 'cong viec 1'

  function changeInput(e) {
    const value = e.target.value
    setValueInput(value)
  }

  function addTodo() {
    console.log('click')
    setTodoList(valueInput)
  }

  return (
    <div>
      <input onChange={changeInput}></input>
      <button onClick={addTodo}>Add todo</button>
      <Test name={todoList}></Test>
    </div>
  )
}

export default Home
