import React, { useState, useEffect, useCallback } from 'react'
import { PageHeader, Button, Descriptions, Drawer, Form, Row, Col, Input, DatePicker, Radio, notification } from 'antd';
import moment from 'moment';
import { UploadFunction } from '@components'
import { Client } from '@tools'
import { UPDATE_USER } from './queries';

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
      dayOfBirth: dayOfBirth ? moment(dayOfBirth) : null,
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
          if (res.data) {
            notification.success({
              message: t('common.message.updateProfile.success'),
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
          <Button key="1" type="" onClick={() => setVisible(true)}>{t('profilePage.updateProfile')}</Button>,
        ]}
        avatar={{ src: currentUser.avatar }}
      >
        <Descriptions size="small" column={2}>
          <Descriptions.Item label={t('profilePage.username')}>{currentUser?.username}</Descriptions.Item>
          <Descriptions.Item label={t('profilePage.fullName')}>{currentUser?.fullName}</Descriptions.Item>
          <Descriptions.Item label={t('profilePage.accountCreatedAt')}>{moment(currentUser?.createdAt).format("MMM DD YYYY")}</Descriptions.Item>
          <Descriptions.Item label={t('profilePage.dayOfBirth')}>{moment(currentUser?.dayOfBirth).format("MMM DD YYYY")}</Descriptions.Item>
        </Descriptions>
        <Drawer
          title={t('profilePage.updateProfile')}
          visible={visible}
          width={width > 800 ? width / 2 : width / 1.1}
          onClose={() => setVisible(false)}
        >
          <Form layout="vertical" hideRequiredMark form={form} name="profile-user">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label={t('profilePage.avatar')}>
                  <UploadFunction uploadImage={(value) => setAvatar(value)}></UploadFunction>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label={t('profilePage.fullName')} name='fullName'>
                  <Input placeholder="Please enter full name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('profilePage.email')} name='email'>
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Please enter email"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label={t('profilePage.username')} name='username'>
                  <Input placeholder="Please enter username" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('profilePage.gender')} name='gender'>
                  <Radio.Group>
                    <Radio value="MALE">{t('profilePage.genders.male')}</Radio>
                    <Radio value="FEMALE">{t('profilePage.genders.female')}</Radio>
                    <Radio value="OTHER">{t('profilePage.genders.other')}</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label={t('profilePage.dayOfBirth')} name='dayOfBirth'>
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
              {t('profilePage.cancelBtn')}
            </Button>
            <Button onClick={handleUpdateUser} type="primary">
              {t('profilePage.updateBtn')}
            </Button>
          </div>
        </Drawer>
      </PageHeader>
    </div >
  )
}

export default React.memo(Profile)