import React, { useState, useCallback, useRef } from 'react'
import { Form, Card, Avatar, Layout, Button, Modal, Row, Col, Input, notification, Menu, Dropdown, Badge } from 'antd';
import { LikeOutlined, EllipsisOutlined, EditOutlined } from '@ant-design/icons'
import { useQuery } from 'react-apollo';
import { GET_POSTS, TOGGLE_LIKE_POST, CREATE_NEW_POST, DELETE_POST } from './queries';
import { Client } from '@tools';
import { UploadFunction } from '@components'

const { Meta } = Card;

function Home(props) {
  const { t, currentUser, history } = props
  const { data, refetch } = useQuery(GET_POSTS, {
    fetchPolicy: 'no-cache'
  })

  const descriptionRef = useRef()
  const [visibleModel, setVisibleModel] = useState(false)
  const [thumbnails, setThumbnails] = useState('')
  const [deletePostId, setDeletePostId] = useState('')
  const [editPostId, setEditPostId] = useState('')

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

  const handlePostNew = useCallback(() => {
    Client.mutate({
      mutation: CREATE_NEW_POST,
      variables: {
        input: {
          description: descriptionRef.current.state.value,
          thumbnails
        }
      }
    }).then(res => {
      if (res.data) {
        notification.success({
          message: t('common.message.postNew.success'),
          placement: 'bottomRight'
        })
        refetch()
        setVisibleModel(false)
        descriptionRef.current.handleReset()
      }
    })
  })

  const handleDeletePost = useCallback(() => {
    Client.mutate({
      mutation: DELETE_POST,
      variables: {
        idPost: deletePostId
      }
    }).then(res => {
      if (res.data.deletePost) {
        notification.success({
          message: t('common.message.deletePost.success'),
          placement: 'bottomRight'
        })
        refetch()
        setDeletePostId('')
      }
    })
  })

  const handleUpdatePost = useCallback(() => {
    console.log(editPostId)
  })

  return (
    <Layout>
      <Button
        type="primary"
        style={{
          marginBottom: '20px',
          width: '50vw',
          position: 'relative',
          left: '25%'
        }}
        onClick={() => setVisibleModel(true)}
      >{t('homePage.addPost')}</Button>
      <Modal
        title={t('homePage.addPost')}
        visible={visibleModel}
        okText={t('homePage.ok')}
        cancelText={t('homePage.cancel')}
        onOk={handlePostNew}
        onCancel={() => {
          setVisibleModel(false)
          descriptionRef.current.handleReset()
        }}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label={t('homePage.description')}>
                <Input ref={descriptionRef}></Input>
                <div className="uploadImage">
                  <UploadFunction uploadImage={(value) => setThumbnails(value)}></UploadFunction>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title={t('homePage.deletePost')}
        visible={deletePostId.length > 0}
        onOk={handleDeletePost}
        onCancel={() => setDeletePostId('')}
      >
        {t('homePage.confirmDelete')}
      </Modal>
      <Modal
        title={t('homePage.editPost')}
        visible={editPostId.length > 0}
        onOk={handleUpdatePost}
        onCancel={() => setEditPostId('')}
      >
        {t('homePage.confirmDelete')}
      </Modal>
      <Layout>
        {
          (data && data.getPosts) ? (
            data.getPosts.sort((a, b) => {
              return b.createdAt - a.createdAt
            }).map(item => {
              return (
                <Card
                  key={item._id}
                  style={{ width: "100%", float: 'center', margin: '0 0 20px 0', backgroundColor: '#dce3de' }}
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
                    <p><EditOutlined key="edit" /> {t('homePage.comment')}</p>,
                    <Dropdown
                      overlay={
                        (
                          <Menu>
                            <Menu.Item key="0" onClick={() => setDeletePostId(item._id)}>
                              <a>{t('homePage.deletePost')}</a>
                            </Menu.Item>
                            <Menu.Item key="1" onClick={() => setEditPostId(item._id)}>
                              <p>{t('homePage.editPost')}</p>
                            </Menu.Item>
                            <Menu.Divider />
                          </Menu>
                        )
                      }
                      trigger={['click']}
                    ><EllipsisOutlined key="ellipsis" /></Dropdown>,
                  ]}
                >
                  <Meta
                    avatar={<Badge status={item.creator.isOnline ? 'success' : 'default'}> <Avatar src={item.creator.avatar} /> </Badge>}
                    title={<div style={{ cursor: 'pointer' }} onClick={() => history.push(`${item.creator.username}`)}>{item.creator.username}</div>}
                    description={item.description}
                  />
                </Card>
              )
            })
          ) : (
              <Card loading={true}></Card>
            )
        }
      </Layout>
    </Layout>
  )
}

export default Home
