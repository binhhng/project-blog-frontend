import React, { useContext } from 'react'
import { CommonContext } from '@tools'
import { Menu, Layout, Breadcrumb, AutoComplete, Input, Dropdown } from 'antd';
import { HomeOutlined, UserOutlined, GlobalOutlined, PoweroffOutlined, DashboardOutlined } from '@ant-design/icons';
import './style.css'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { ROLE_DASHBOARD } from '@constants'

const { Header, Content, Footer } = Layout

const GET_CURRENT_USER = gql`
  query{
    getCurrentUser{
      _id
      role
      username
      avatar
      fullName
      createdAt
    }
  }
`

function LayoutDesign(props) {
  const { history, t, location: { pathname } } = props
  const { dispatch } = useContext(CommonContext)
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only'
  })

  function onHandleChangeLanguage(value) {
    dispatch({ type: "changeLanguage", payload: value })
  }
  function onLogout() {
    console.log('logout')
    dispatch({ type: "logout", payload: false })
  }
  const menuDropdown = (
    <Menu style={{
      backgroundColor: "#111",

    }} >
      <Menu.Item key="10">
        <span className="menuLan" onClick={() => onHandleChangeLanguage('vi')}>{t('common.language.vietnamese')}</span>
      </Menu.Item>
      <Menu.Item key="11">
        <span className="menuLan" onClick={() => onHandleChangeLanguage('en')}>{t('common.language.english')}</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Layout className="layout">
        <Header style={{
          backgroundColor: "#303030",
          position: "fixed",
          zIndex: 1,
          width: "100%"
        }} >
          <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]} style={{
            backgroundColor: "#303030"
          }} >
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
              < PoweroffOutlined onClick={onLogout} />
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
              <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{ width: 250 }}
                options={[]}
              >
                <Input.Search style={{
                }} placeholder={t("common.menu.search")} />
              </AutoComplete>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', backgroundColor: '#1C1E21', color: "white", marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0', color: "white" }}>
            <Breadcrumb.Item>App</Breadcrumb.Item>
            <Breadcrumb.Item>{pathname === '/' ? 'home' : pathname}</Breadcrumb.Item>
          </Breadcrumb>
          {/* <div className="site-layout-content"> */}
          {
            (data && data.getCurrentUser) ? React.cloneElement(props.children, {
              currentUser: data.getCurrentUser
            }) : null
          }
          {/* </div> */}
        </Content>
        {/* <Footer style={{ textAlign: 'center', backgroundColor: "#1C1E21", color: "white" }}>Copyright Mysterious</Footer> */}
      </Layout>
    </div >
  )
}

export default LayoutDesign