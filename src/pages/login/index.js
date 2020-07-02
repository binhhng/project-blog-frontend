import React, { useState, useContext } from 'react'
import { CommonContext, Client } from '@tools'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { LOGIN } from './gql'
import './style.css'

function Login(props) {
  const { t, history } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { dispatch } = useContext(CommonContext)

  function onHandleLogin(e) {
    Client.mutate({
      mutation: LOGIN,
      variables: {
        input: {
          username,
          password
        }
      }
    }).then(res => {
      console.log(res)
      if (res.data.login) {
        const { token } = res.data.login
        notification.success({
          message: t('common.message.login.success'),
          placement: 'bottomRight'
        })
        dispatch({
          type: 'login',
          payload: token
        })
      } else {
        notification.error({
          message: t('common.message.login.failed'),
          placement: 'bottomRight'
        })
      }
    }).catch(err => {
      notification.error({
        message: 'Login thất bại',
        placement: 'bottomRight'
      })
    })
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
    <div>
      <h1 className='header'>Mysterious Blog</h1>
      <Form
        name='normal_login'
        className='Outline'
        initialValues={{
          remember: true
        }}
      >
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Input
            onChange={value => onChangeInput('username', value)}
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Input.Password
            onChange={value => onChangeInput('password', value)}
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox className='fontstyle'>{t('loginPage.rememberPassword')}</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button
            onClick={onHandleLogin}
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            {t('loginPage.login')}
          </Button>
        </Form.Item>
        <Form.Item>
          <a className='login-form-forgot' href=''>
            {t('loginPage.forgotPassword')}
          </a>
          <a
            onClick={() => history.push('/register')}
            className='register_form'
          >
            {t('loginPage.register')}
          </a>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
