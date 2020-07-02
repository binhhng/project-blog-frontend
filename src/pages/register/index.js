import React, { useState } from 'react'
import { Form, Radio, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, notification, } from 'antd'
import './style.css'
import { AliwangwangOutlined, UserOutlined, MailOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Client } from '@tools'
import { CREATE_NEW_USER } from './queries'

function Register(props) {
  const { t, history } = props
  const onFinish = values => {
    console.log('Received values of form: ', values);
    const {
      username,
      password,
      fullName,
      gender,
      email
    } = values
    Client.mutate({
      mutation: CREATE_NEW_USER,
      variables: {
        input: {
          username,
          password,
          fullName,
          gender,
          role: 'MEMBER',
          email
        }
      }
    }).then(res => {
      if (res.data.createUser) {
        notification.success({
          message: 'Tạo tài khoản thành công, vui lòng đăng nhập',
          placement: 'bottomRight'
        })
        history.push('/')
      } else {
        notification.error({
          message: 'Tên đăng nhập đã được sử dụng',
          placement: 'bottomRight'
        })
      }
    }).catch(err => {
      notification.error({
        message: err,
        placement: 'bottomRight'
      })
    })
  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 12,
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
      <h1 className='registerHeader'>Mysterious Blog</h1>
      <Form
        {...formItemLayout}
        name='register'
        className='formRegister'
        onFinish={onFinish}
        initialValues={{
          remember: true
        }}
        hideRequiredMark
      >
        <Form.Item
          name="username"
          label={t('registerPage.username')}
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon'
              placeholder='Username' />} />
        </Form.Item>
        <Form.Item
          name="fullName"
          label={t('registerPage.fullName')}
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<AliwangwangOutlined className='site-form-item-icon'
              placeholder='Username' />} />
        </Form.Item>
        <Form.Item name="gender" label={t('registerPage.gender')} rules={[
          {
            required: true
          }
        ]}>
          <Radio.Group>
            <Radio value="MALE">{t('registerPage.genders.male')}</Radio>
            <Radio value="FEMALE">{t('registerPage.genders.female')}</Radio>
            <Radio value="OTHER">{t('registerPage.genders.other')}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="email"
          label={t('registerPage.email')}
          rules={[
            {
              type: 'email',
            },
            {
              required: true,
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email' />
        </Form.Item>
        <Form.Item
          name="password"
          label={t('registerPage.password')}
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={< LockOutlined className='site-form-item-icon'
              placeholder='Password' />} />
        </Form.Item>
        <Form.Item
          name="confirm"
          label={t('registerPage.confirmPassword')}
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject();
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<ExclamationCircleOutlined className='site-form-item-icon'
              placeholder='Confirm Password' />} />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            {t('registerPage.policy')} <a href="">{t('registerPage.agreement')}</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className='submitBtn'>
            {t('registerPage.register')}
          </Button>
        </Form.Item>
      </Form>
    </div >
  )

}
export default React.memo(Register)