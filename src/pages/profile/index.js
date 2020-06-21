import React from 'react'
import { PageHeader, Button, Descriptions } from 'antd';
import moment from 'moment';

function Profile(props) {
  const { t, currentUser } = props
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={currentUser.username}
        subTitle={currentUser.fullName}
        style={{
          backgroundColor: '#1890ff'
        }}
        extra={[
          <Button key="1" type="">Sửa thông tin</Button>,
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Tên người dùng">{currentUser.username}</Descriptions.Item>
          <Descriptions.Item label="Họ và tên">{currentUser.fullName}</Descriptions.Item>
          <Descriptions.Item label="Ngày tạo tài khoản">{moment(currentUser.createdAt).format("MMM DD YYYY")}</Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>
  )
}

export default Profile