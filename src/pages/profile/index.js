import React, { useState, useEffect, useCallback } from 'react'
import { PageHeader, Button, Descriptions, Drawer, Form, Row, Col, Input, DatePicker, Select, Radio, notification } from 'antd';
import moment from 'moment';
import { UploadFunction } from '@components'
import { Client } from '@tools'
import { UPDATE_USER } from './queries';

const { Option } = Select
const width = window.innerWidth

function Profile(props) {
  const { t, currentUser, refetchCurrentUser } = props
  const [visible, setVisible] = useState(false)
  const [avatar, setAvatar] = useState('')

  const [form] = Form.useForm()
  const { setFieldsValue, validateFields } = form

  useEffect(() => {
    const {
      dayOfBirth
    } = currentUser
    setFieldsValue({
      ...currentUser,
      dayOfBirth: moment(dayOfBirth),
    })
  }, [currentUser])

  const handleUpdateUser = useCallback(() => {
    validateFields()
      .then(res => {
        console.log(res)
        const {
          username,
          fullName,
          gender,
          email,
          dayOfBirth,
        } = res
        console.log(dayOfBirth)
        Client.mutate({
          mutation: UPDATE_USER,
          variables: {
            input: {
              username,
              fullName,
              gender,
              email,
              dayOfBirth: dayOfBirth.valueOf(),
              avatar
            }
          }
        }).then(res => {
          console.log(res.data.updateUser)
          if (res.data) {
            notification.success({
              message: 'Sửa thông tin thành công',
              placement: 'bottomRight'
            })
            refetchCurrentUser()
            setVisible(false)
          }
        }).catch(err => {
          console.log(err)
        })
      })
  })

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={currentUser?.username}
        subTitle={currentUser?.fullName}
        style={{
          backgroundColor: '#c3d4c8'
        }}
        extra={[
          <Button key="1" type="" onClick={() => setVisible(true)}>Sửa thông tin</Button>,
        ]}
        avatar={{ src: currentUser.avatar }}
      >
        <Descriptions size="small" column={2}>
          <Descriptions.Item label="Tên người dùng">{currentUser?.username}</Descriptions.Item>
          <Descriptions.Item label="Họ và tên">{currentUser?.fullName}</Descriptions.Item>
          <Descriptions.Item label="Ngày tạo tài khoản">{moment(currentUser?.createdAt).format("MMM DD YYYY")}</Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">{moment(currentUser?.dayOfBirth).format("MMM DD YYYY")}</Descriptions.Item>
        </Descriptions>
        <Drawer
          title='Sua thong tin'
          visible={visible}
          width={width > 800 ? width / 2 : width / 1.1}
          onClose={() => setVisible(false)}
        >
          <Form layout="vertical" hideRequiredMark form={form} name="profile-user">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Change avatar">
                  <UploadFunction uploadImage={(value) => setAvatar(value)}></UploadFunction>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Full Name" name='fullName'>
                  <Input placeholder="Please enter full name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name='email'>
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Please enter email"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Username" name='username'>
                  <Input placeholder="Please enter username" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Sex" name='gender'>
                  <Radio.Group>
                    <Radio value="MALE">Male</Radio>
                    <Radio value="FEMALE">Female</Radio>
                    <Radio value="OTHER">Other</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Day of Birth" name='dayOfBirth'>
                  <DatePicker
                    style={{ width: '100%' }}
                    format='DD/MM/YYYY'
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Description" name='description'>
                  <Input.TextArea rows={1} placeholder="please enter your description" disabled />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={() => setVisible(false)} style={{ marginRight: 8 }}>
              Cancel
                </Button>
            <Button onClick={handleUpdateUser} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </PageHeader>
    </div >
  )
}

export default React.memo(Profile)