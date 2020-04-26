// eslint-disable
import React, { useContext } from 'react'
import { CommonContext } from '@tools'
import { Menu, Select} from 'antd';
import { HomeTwoTone, UserOutlined, GlobalOutlined, PoweroffOutlined, SearchOutlined } from '@ant-design/icons';


function Layout(props) {
  const { history, t } = props
  const { Header, Content, Footer } = Layout
  const { dispatch } = useContext(CommonContext)
  
  function onHandleChangeLanguage(e) {
    const { value } = e.target
    dispatch({ type: "changeLanguage", payload: value })
  }

  function onChangeRoute(value) {
    history.push(value)
  }

  function onLogout() {
    console.log('logout')
    dispatch({ type: "logout", payload: false })
  }
  

  return (
    <div>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1"><div className="HomeLogo"/><HomeTwoTone />Home</Menu.Item>
        <Menu.Item key="2"><div className="UserLogo"/><UserOutlined />User</Menu.Item>
        <Menu.Item key="3"><div className="SearchLogo"/><SearchOutlined />Search</Menu.Item>
        <Menu.Item key="4"><div className="LogoutLogo"/>< PoweroffOutlined />
        <button onChange={onLogout}>Logout
        </button> 
        </Menu.Item>
        <Menu.Item key="5"><div className="LanguageLogo"/><GlobalOutlined />
        <select onChange={onHandleChangeLanguage}>
          <option value="vi">ChangeLanguage</option>
          <option value="vi">Vietnamese</option>
          <option value="en">English</option>
        </select> 
        </Menu.Item>

      </Menu>  
    </div>

 
  )
}

export default Layout
