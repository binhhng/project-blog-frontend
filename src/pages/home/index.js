import React, { useState } from 'react'
import Test from './listTodo'

function Home(props) {
  console.log(props)
  const { t } = props
  return t("home.title")
}

export default Home
