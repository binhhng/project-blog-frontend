import React, { useContext, useCallback, useState, useRef } from 'react'
import { CommonContext } from '@tools'
import { Menu, Layout, Breadcrumb, Select, Typography, Dropdown, Spin } from 'antd';
import { HomeOutlined, UserOutlined, GlobalOutlined, PoweroffOutlined, DashboardOutlined } from '@ant-design/icons';
import './style.css'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { ROLE_DASHBOARD } from '@constants'
import { Client } from '@tools'

const { Header, Content } = Layout
const { Title, Text } = Typography
const { Option } = Select


const GET_CURRENT_USER = gql`
  query{
    getCurrentUser{
      _id
      role
      username
      avatar
      email
      gender
      fullName
      createdAt
      dayOfBirth
    }
  }
`

const SEARCH_USER = gql`
  query($keyword: String){
    searchUser(keyword: $keyword){
      _id
      username
      fullName
    }
  }
`

function LayoutDesign(props) {
  const { history, t, location: { pathname } } = props
  const { dispatch } = useContext(CommonContext)
  const typingTimeOut = useRef(null)
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only'
  })

  const [users, setUsers] = useState([])

  const handleSearchUser = useCallback((value) => {
    if (typingTimeOut.current) {
      clearTimeout(typingTimeOut.current)
    }

    typingTimeOut.current = setTimeout(() => {
      Client.query({
        query: SEARCH_USER,
        variables: {
          keyword: value
        }
      }).then(res => {
        setUsers(res.data.searchUser)
      }).catch(err => {
        console.log(err)
      })
    }, 300)
  })

  const menuDropdown = (
    <Menu>
      <Menu.Item key="10">
        <span className="menuLan" onClick={() => dispatch({ type: "changeLanguage", payload: 'vi' })}>{t('common.language.vietnamese')}</span>
      </Menu.Item>
      <Menu.Item key="11">
        <span className="menuLan" onClick={() => dispatch({ type: "changeLanguage", payload: 'en' })}>{t('common.language.english')}</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Layout className="layout">
        <Header style={{
          position: "fixed",
          zIndex: 1,
          width: "100%"
        }} >
          <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
            <Menu.Item key="/" onClick={() => history.push('/')}>
              <HomeOutlined />{t("common.menu.home")}
            </Menu.Item>
            <Menu.Item key="/profile" onClick={() => history.push('/profile')}>
              <UserOutlined />{t("common.menu.profile")}
            </Menu.Item>
            {
              (data && data.getCurrentUser && ROLE_DASHBOARD.includes(data.getCurrentUser.role)) ? (
                <Menu.Item key="/dashboard" onClick={() => history.push('/dashboard')}>
                  <DashboardOutlined />{t("common.menu.dashboard")}
                </Menu.Item>
              ) : null
            }
            <Menu.Item style={{
              float: 'right',
              marginRight: '20px',
            }} >
              < PoweroffOutlined onClick={() => dispatch({ type: "logout", payload: false })} />
            </Menu.Item>
            <Menu.Item style={{
              float: 'right',
              marginRight: '30px'
            }}>
              <Dropdown overlay={menuDropdown}>
                <GlobalOutlined />
              </Dropdown>
            </Menu.Item>
            <Menu.Item style={{
              float: 'right',
              marginRight: '100px',
            }}>
              <Select
                showSearch
                labelInValue
                showArrow={false}
                placeholder='Search User'
                notFoundContent={<Spin size="small" />}
                filterOption={false}
                onSearch={handleSearchUser}
                onChange={({ value }) => history.push(value)}
                style={{ width: '20vw' }}
              >
                {
                  users && users.map(item => {
                    return <Option value={item.username}>
                      {`${item.username} (${item.fullName})`}
                    </Option>
                  })
                }
              </Select>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Mysterious Blog</Breadcrumb.Item>
            <Breadcrumb.Item>{pathname === '/' ? 'home' : pathname.slice(1, pathname.length)}</Breadcrumb.Item>
          </Breadcrumb>
          {
            (data && data.getCurrentUser) ? React.cloneElement(props.children, {
              currentUser: data.getCurrentUser,
              refetchCurrentUser: refetch
            }) : null
          }
        </Content>
      </Layout>
    </div >
  )
}

export default LayoutDesign