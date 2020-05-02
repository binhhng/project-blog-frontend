import React, { useContext } from 'react'
import { CommonContext } from '@tools'
<<<<<<< HEAD
import { Button } from 'antd'
=======
import { Menu, Layout, Breadcrumb, AutoComplete, Input, Dropdown } from 'antd';
import { HomeTwoTone, UserOutlined, GlobalOutlined, PoweroffOutlined, DashboardOutlined } from '@ant-design/icons';
import './style.css'
>>>>>>> cicd

function LayoutDesign(props) {
  const { history, t, location: { pathname } } = props
  const { Header, Content, Footer } = Layout
  const { dispatch } = useContext(CommonContext)
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
<<<<<<< HEAD
      <select onChange={onHandleChangeLanguage}>
        <option value="vi">{t('option.changeLang')}</option>
        <option value="vi">{t('common.language.vietnamese')}</option>
        <option value="en">{t('common.language.english')}</option>
      </select>
      <ul>
        <li onClick={() => onChangeRoute('/')}>{t('common.menu.home')} (click)</li>
        <li onClick={() => onChangeRoute('/role')}>{t('common.menu.role')} (click)</li>
        <li onClick={onLogout}>{t('common.menu.logout')}</li>
      </ul>
      <p>{props.children}</p>
    </div>
=======
      <Layout className="layout">
        <Header style={{
          backgroundColor: "black",
          position: "fixed",
          zIndex: 1,
          width: "100%"
        }} >
          <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]} style={{
            backgroundColor: "inherit"
          }} >
            <Menu.Item key="/" onClick={() => history.push('/')}>
              <HomeTwoTone />Home
            </Menu.Item>
            <Menu.Item key="/profile" onClick={() => history.push('/profile')}>
              <UserOutlined />Profile
            </Menu.Item>
            <Menu.Item key="/dashboard" onClick={() => history.push('/dashboard')}>
              <DashboardOutlined />Dashboard
            </Menu.Item>
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
                }} placeholder="Search here" />
              </AutoComplete>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', backgroundColor: '#1C1E21', color: "white", marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0', color: "white" }}>
            <Breadcrumb.Item>App</Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">{props.children}</div>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: "#1C1E21", color: "white" }}>Copyright Mysterious</Footer>
      </Layout>
    </div >
>>>>>>> cicd
  )
}

export default LayoutDesign