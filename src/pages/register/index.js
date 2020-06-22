import React, {useState} from 'react'
import {Form, Radio, Input,Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,} from 'antd'
import './style.css'
import {AliwangwangOutlined, UserOutlined, MailOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

function Register(props) {
  const { t, history } = props
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  return (
    <div>
     <h1 className='header'>Mysterious</h1>
     <Form
      {...formItemLayout}
        name='register'
        className='Outline'
        onFinish={onFinish}
        initialValues={{
          remember: true
        }}
      >
        <Form.Item
        name="username"
        label = "Username"
        rules={[
          {
            required: true,
            message: 'Please input username!',
          },
        ]}
        hasFeedback
      >
        <Input
        prefix={<UserOutlined className='site-form-item-icon' 
        placeholder='Username'/>}/>
      </Form.Item>
      <Form.Item
        name="fullname"
        label = "Full Name"
        rules={[
          {
            required: true,
            message: 'Please input your Name!',
          },
        ]}
        hasFeedback
      >
        <Input 
        prefix={<AliwangwangOutlined className='site-form-item-icon' 
        placeholder='Username'/>}/>
      </Form.Item>
      <Form.Item name="gender" label="Gender">
        <Radio.Group>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
          <Radio value="Other">Other</Radio>
        </Radio.Group>
      </Form.Item>
        <Form.Item
        name="email"
        label = "Email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input
        prefix={<MailOutlined className='site-form-item-icon' />}
        placeholder='Email'/>
        </Form.Item>
        <Form.Item
        name="password"
        label = "Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password 
        prefix={< LockOutlined className='site-form-item-icon' 
        placeholder='Password'/>}/>
      </Form.Item>
      <Form.Item
        name="confirm"
        label = "Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password 
        prefix={<ExclamationCircleOutlined className='site-form-item-icon' 
      placeholder='Confirm Password'/>}/>
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('Should accept agreement'),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      </Form>
    </div>
  )

}
export default Register

/*
<p>{t('registerPage.register')}</p>
      <button onClick={() => history.push('/')}>Come back home</button>
          
  return (
    <div>
     <h1 className='header'>Mysterious</h1>
    
    </div>
  )
    
      */