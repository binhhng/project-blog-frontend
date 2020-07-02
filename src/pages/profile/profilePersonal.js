import React, { useCallback } from 'react'
import { PageHeader, Button, Descriptions, Drawer, Typography, Row, Avatar, Menu, Dropdown, Select, Card } from 'antd';
import moment from 'moment';
import { LikeOutlined, EllipsisOutlined, EditOutlined } from '@ant-design/icons'
import { useQuery } from 'react-apollo';
import { Client } from '@tools';
import { GET_PERSONAL_PROFILE, TOGGLE_LIKE_POST } from './queries';


const { Option } = Select
const width = window.innerWidth
const { Meta } = Card;
const { Title } = Typography

function ProfilePersonal(props) {
  const { t, currentUser, location: { pathname } } = props
  const { data: dataPersonalProfile, loading, error, refetch } = useQuery(GET_PERSONAL_PROFILE, {
    variables: {
      username: pathname.slice(1, pathname.length)
    }
  })

  const { creator, posts } = dataPersonalProfile && dataPersonalProfile.getPersonalProfile ? dataPersonalProfile.getPersonalProfile : {}

  const handleToggleLike = useCallback((idPost) => {
    Client.mutate({
      mutation: TOGGLE_LIKE_POST,
      variables: {
        idPost
      }
    }).then(res => {
      if (res.data) {
        refetch()
      }
    }).catch(err => {
      console.log(err)
    })
  })

  return (
    <div>
      {
        creator ? (
          <div>
            <PageHeader
              ghost={false}
              onBack={() => window.history.back()}
              title={creator?.username}
              subTitle={`${creator?.isOnline ? `( ${t('profilePage.online')} )` : `( ${t('profilePage.offline')} )`}`}
              style={{
                backgroundColor: '#c3d4c8'
              }}
              extra={[
                <Button key="1" type="">{t('profilePage.follow')}</Button>,
              ]}
              avatar={{ src: creator?.avatar }}
            >
              <Descriptions size="small" column={2}>
                <Descriptions.Item label={t('profilePage.username')}>{creator?.username}</Descriptions.Item>
                <Descriptions.Item label={t('profilePage.fullName')}>{creator?.fullName}</Descriptions.Item>
                <Descriptions.Item label={t('profilePage.accountCreatedAt')}>{moment(creator?.createdAt).format("MMM DD YYYY")}</Descriptions.Item>
                <Descriptions.Item label={t('profilePage.dayOfBirth')}>{moment(creator?.dayOfBirth).format("MMM DD YYYY")}</Descriptions.Item>
              </Descriptions>
            </PageHeader>
            {
              posts && posts.sort((a, b) => {
                return b.createdAt - a.createdAt
              }).map(item => {
                return (
                  <Card
                    key={item._id}
                    style={{ float: 'center', margin: '20px 20px 20px 20px', backgroundColor: '#dce3de' }}
                    cover={
                      <img
                        src={item.thumbnails}
                      />
                    }
                    actions={[
                      <div
                        style={{
                          color: item.idLikes.includes(currentUser._id) ? '#1890ff' : 'inherit'
                        }}
                        onClick={() => handleToggleLike(item._id)}
                      ><LikeOutlined />{item.idLikes.length === 0 ? '' : item.idLikes.length}</div>,
                      <p><EditOutlined key="edit" /> Comment</p>,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                  >
                    <Meta
                      avatar={<Avatar src={creator.avatar} />}
                      title={<div>{creator.username}</div>}
                      description={item.description}
                    />
                  </Card>
                )
              })
            }
          </div>
        ) : (
            'Not found user !!'
          )
      }
    </div>
  )
}

export default React.memo(ProfilePersonal)