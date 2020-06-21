import React from 'react'
import { Spin } from 'antd'
import './style.css'

function Loading() {
  return (
    <div className='loadingIcon'>
      <Spin size='default' tip='loading...' />
    </div>
  )
}

export { Loading }
