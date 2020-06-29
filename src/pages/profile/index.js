import React, { useState } from 'react'
import { PageHeader, Button, Descriptions, Drawer, Form, Row, Col, Input, DatePicker, Select, Radio } from 'antd';
import moment from 'moment';

const { Option } = Select
const width = window.innerWidth

function Profile(props) {
  const { t, currentUser } = props

  const [visible, setVisible] = useState(false)

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={currentUser?.username}
        subTitle={currentUser?.fullName}
        style={{
          backgroundColor: '#1890ff'
        }}
        extra={[
          <Button key="1" type="" onClick={() => setVisible(true)}>Sửa thông tin</Button>,
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Tên người dùng">{currentUser?.username}</Descriptions.Item>
          <Descriptions.Item label="Họ và tên">{currentUser?.fullName}</Descriptions.Item>
          <Descriptions.Item label="Ngày tạo tài khoản">{moment(currentUser?.createdAt).format("MMM DD YYYY")}</Descriptions.Item>
          <Descriptions.Item label="Ngày tháng năm sinh">{moment(currentUser?.dayOfBirth).format("MMM DD YYYY")}</Descriptions.Item>
        </Descriptions>
        <Drawer
          title='Sua thong tin'
          visible={visible}
          width={width > 800 ? width / 2 : width / 1.1}
          onClose={() => setVisible(false)}
          style={{
            color: 'black'
          }}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Change avatar">
                  {/* <UploadFunction uploadImage={uploadAvatar}></UploadFunction> */}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Full Name">
                  <Input defaultValue={currentUser.fullname} placeholder="Please enter full name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email">
                  <Input
                    style={{ width: '100%' }}
                    defaultValue={currentUser.email}
                    placeholder="Please enter email"
                    onChange={(e) => {
                      email = e.target.value
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Username">
                  <Input placeholder="Please enter username"
                    defaultValue={currentUser.username}
                    onChange={(e) => {
                      username = e.target.value
                    }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Sex">
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
                <Form.Item label="Day of Birth">
                  <DatePicker
                    style={{ width: '100%' }}
                    // getPopupContainer={trigger => trigger.parentNode}
                    // disabledDate={disabledDate}
                    defaultValue={moment(currentUser?.dayOfBirth)}
                    format='DD/MM/YYYY  '
                    onChange={(e) => {
                      if (e) dob = e.toDate().getTime()
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Description">
                  <Input.TextArea defaultValue={currentUser.description} rows={1} placeholder="please enter your description" onChange={(e) => {
                    description = e.target.value
                  }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </PageHeader>
    </div>
  )
}

export default React.memo(Profile)