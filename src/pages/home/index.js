import React, { useState, useCallback, useRef } from 'react'
import { Form, Card, Avatar, Layout, Button, Modal, Row, Col, Input, notification, Menu, Dropdown, Popconfirm } from 'antd';
import { LikeOutlined, EllipsisOutlined, EditOutlined } from '@ant-design/icons'
import { useQuery } from 'react-apollo';
import { GET_POSTS, TOGGLE_LIKE_POST, CREATE_NEW_POST, DELETE_POST } from './queries';
import { Client } from '@tools';
import { UploadFunction } from '@components'

const { Meta } = Card;

function Home(props) {
  const { t, currentUser } = props
  const { data, refetch } = useQuery(GET_POSTS)

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
          message: 'Đăng bài thành công',
          placement: 'bottomRight'
        })
        refetch()
        setVisibleModel(false)
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
          message: 'Xoá bài thành công',
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
          width: '30vw'
        }}
        onClick={() => setVisibleModel(true)}
      >Thêm bài viết</Button>
      <Modal
        title="Thêm bài viết"
        visible={visibleModel}
        onOk={handlePostNew}
        onCancel={() => setVisibleModel(false)}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Nội dung  :">
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
        title="Xoá bài viết"
        visible={deletePostId.length > 0}
        onOk={handleDeletePost}
        onCancel={() => setDeletePostId('')}
      >
        Bạn có chắc muốn xoá bài viết
      </Modal>
      <Modal
        title="Sửa bài viết"
        visible={editPostId.length > 0}
        onOk={handleUpdatePost}
        onCancel={() => setEditPostId('')}
      >
        Bạn có chắc muốn xoá bài viết
      </Modal>
      <Layout>
        {
          (data && data.getPosts) ? (
            data.getPosts.sort((a, b) => {
              return b.createdAt - a.createdAt
            }).map(item => {
              return (
                <Card
                  style={{
                    margin: '0 0 20px 0'
                  }}
                  key={item._id}
                  style={{ width: "100%", float: 'center' }}
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
                    <Dropdown
                      overlay={
                        (
                          <Menu>
                            <Menu.Item key="0" onClick={() => setDeletePostId(item._id)}>
                              <a>Xoá bài viết</a>
                            </Menu.Item>
                            <Menu.Item key="1" onClick={() => setEditPostId(item._id)}>
                              <p>Sửa bài viết</p>
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
                    avatar={<Avatar />}
                    title={item.creator.username}
                    description={item.description}
                  />
                  {/* {data[index].comments ? <Comment
                    actions={[
                        <span key="comment-basic-like">
                            <Tooltip title="Like">
                                <Icon
                                    type="like"
                                    theme={action === 'liked' ? 'filled' : 'outlined'}
                                    // onClick={() => { like(data.[index]._id) }}
                                />
                            </Tooltip>
                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{data[index].like}</span>
                        </span>,
                        <span key=' key="comment-basic-dislike"'>
                            <Tooltip title="Dislike">
                                <Icon
                                    type="dislike"
                                    theme={action === 'disliked' ? 'filled' : 'outlined'}
                                    // onClick={() => { dislike(data.getAllPost[index]._id) }}
                                />
                            </Tooltip>
                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{data[index].dislike}</span>
                        </span>,
                        <span key="comment-basic-reply-to">Reply to</span>,
                    ]}
                    author={<a>{data[index]}</a>}
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt={data[index].creator.username}
                        />
                    }
                    content={
                        <p>
                            {data[index].description}
                        </p>
                    }
                />: ''} */}

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
