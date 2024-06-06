import React, { useState, useEffect } from 'react';
import { Layout, Button, Dropdown, Avatar, Menu, Space } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';

const { Header } = Layout;

const CustomHeader = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [saveSession, setSaveSession] = useState(null);

  useEffect(() => {
    const session = reactLocalStorage.get('Con_ID');
    setSaveSession(session);
    if (session) {
      fetchUserData(session);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const fetchUserData = async (session) => {
    try {
      const response = await axios.get(`http://localhost/backend/get_navbar_info.php?session=${session}`);
      const { FName, LName } = response.data;
      setUserData({
        hoverText: `${FName} ${LName}`,
      });
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  const handleMenuClick = async ({ key }) => {
    if (key === 'logout') {
      reactLocalStorage.remove('Con_ID');
      setLoggedIn(false);
      setUserData({});
      history.push('/login');
    } else if (key === 'profile') {
      try {
        const session = reactLocalStorage.get('Con_ID');
        const response = await axios.get(`http://localhost/backend/get_navbar_info.php?session=${session}`);
        const { Diet_ID } = response.data;
        console.log('Diet_ID:', Diet_ID);  // 添加日志
        if (Diet_ID) {
          history.push(`/user/?uid=${session}`);
        } else {
          history.push('/choose');
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">
        個人頁面
      </Menu.Item>
      <Menu.Item key="logout">
        登出
      </Menu.Item>
    </Menu>
  );

  const handleButtonClicked = () => {
    // 在这里执行其他操作或导航到其他页面
  };

  return (
    <Header style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15%' }}>
          <Link to="/" style={{ marginRight: '16px', display: 'flex', alignItems: 'center', color: '#1890ff' }}>
            <span style={{ marginRight: '16px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '1.2em' }}>Chilltan</span>
          </Link>
          <span style={{ marginRight: '16px' }}>
            <Button type="primary" style={{ borderRadius: '5px' }} onClick={handleButtonClicked}>
              <Link to="/create" style={{ color: '#fff' }}>記錄</Link>
            </Button>
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '15%' }}>
          {loggedIn ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '43px' }}>
              <Dropdown trigger={['click']} overlay={menu}>
                <span style={{ cursor: 'pointer' }}>
                  <Space>
                    <Avatar src={'/user.png'} />
                    <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '1.1em' }}>{userData.hoverText}</span>
                  </Space>
                </span>
              </Dropdown>
            </span>
          ) : (
            <>
              <span style={{ marginRight: '16px' }}>
                <Link to="/login">
                  <Button style={{ borderRadius: '5px' }}>登入</Button>
                </Link>
              </span>
              <Link to="/register">
                <Button style={{ borderRadius: '5px' }}>註冊</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Header>
  );
};

export default CustomHeader;
