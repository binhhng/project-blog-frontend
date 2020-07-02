import React, { useState } from 'react'
import { PageHeader, Button, Descriptions, Drawer, Form, Row, Col, Input, DatePicker, Select, Radio } from 'antd';
import moment from 'moment';

const { Option } = Select
const width = window.innerWidth

function ProfilePersonal(props) {
  const { t, currentUser, } = props
  const [visible, setVisible] = useState(false)

  return (
    <p>1247128</p>
  )
}

export default React.memo(ProfilePersonal)