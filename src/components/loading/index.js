import React from 'react'
import {Spin} from 'antd';
import './style.css'

function Loading() {
  return (
    <div className="loadingIcon">
      <Spin />
    </div>
  )
}

export { Loading }




 