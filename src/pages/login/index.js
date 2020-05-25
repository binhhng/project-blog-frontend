import React, { useState, useContext } from 'react'
import { CommonContext } from '@tools'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.css'


function Login(props) {
  const { t, history } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { dispatch } = useContext(CommonContext)


  function onHandleLogin(e) {
    if (username === '123' && password === '123') {
      dispatch({ type: 'login', payload: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ZWJkMjBkMC04ODZlLTExZWEtOTU0YS1hYmMyOWU0MmEzNTQiLCJpYXQiOjE1OTAwNTEwMzN9.2aNFsRBMALezD3_5LiyXL9Le_JZqg5MbG7Y19J4f3j0" })
    }
  }

  function onChangeInput(target, e) {
    const { value } = e.target
    if (target === 'username') {
      setUsername(value)
    } else if (target === 'password') {
      setPassword(value)
    }
  }
  

  return (
    <div 
    name="normal_login"
      className="Outline"
      initialValues={{
        remember: true,
      }}
    >
      <h1 className = "header">Mysterious</h1>
      <Form>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input onChange={(value) => onChangeInput('username', value)} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password onChange={(value) => onChangeInput('password', value)}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox className = "fontstyle">Remember me</Checkbox>
        </Form.Item>

      </Form.Item>
      <Form.Item>
        <Button onClick={onHandleLogin} type="primary" htmlType="submit" className="login-form-button">
        {t('loginPage.login')}
        </Button>            
      </Form.Item>
      <Form.Item>
      <a className="login-form-forgot" href="">
      {t('forgotPass.forgot')}
</a>
<a onClick={() => history.push('/register')} className = "register_form">{t('registerPage.register')}</a>
      </Form.Item>
      </Form>
    </div>
  )
}

export default Login

