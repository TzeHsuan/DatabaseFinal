import React, { useState, useEffect } from 'react';
import { Layout, Button, Dropdown, Avatar, Menu, Space, Card, Row, Col } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';

const { Header, Content } = Layout;
const { Meta } = Card;

const CustomHeader = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [consultants, setConsultants] = useState([]);
  const [saveSession, setSaveSession] = useState(null);

  useEffect(() => {
    const session = reactLocalStorage.get('Diet_ID');
    const userType = reactLocalStorage.get('User_Type');
    setSaveSession(session);
    if (session && userType) {
      fetchUserData(session, userType);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const fetchUserData = async (session, userType) => {
    try {
      const response = await axios.get(`http://localhost/backend/diet.php?session=${session}&userType=${userType}`);
      const { dietData, consultants } = response.data;
      if (dietData) {
        const { Diet_Fname, Diet_Lname } = dietData;
        setUserData({
        hoverText: `${Diet_Fname} ${Diet_Lname}`,
        });
        setConsultants(consultants);
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  const handleMenuClick = async ({ key }) => {
    if (key === 'logout') {
      reactLocalStorage.remove('Diet_ID');
      setLoggedIn(false);
      setUserData({});
      setConsultants([]);
      history.push('/login');
    } else if (key === 'profile') {
      try {
        const session = reactLocalStorage.get('Diet_ID');
        const response = await axios.get(`http://localhost/backend/diet.php?session=${session}`);
        const { Diet_ID } = response.data.dietData;

        if (Diet_ID) {
          history.push(`/diet/?uid=${session}`);
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout">登出</Menu.Item>
    </Menu>
  );

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
    },
    linkContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    cardContainer: {
      width: '100%',
    },
    link: {
      textDecoration: 'none',
      color: '#1890ff',
      fontWeight: 'bold',
    },
    description: {
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
    },
  };

  const getColProps = () => {
    return {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 8 },
      lg: { span: 7 },
      xl: { span: 7 },
    };
  };

  return (
    <Layout>
      <Header style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15%' }}>
            <Link to="/" style={{ marginRight: '16px', display: 'flex', alignItems: 'center', color: '#1890ff' }}>
              <span style={{ marginRight: '16px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '1.2em' }}>Chilltan</span>
            </Link>
            <span style={{ marginRight: '16px' }}></span>
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

      <Content style={{ width: '70%', margin: 'auto', justifyContent: 'center' }}>
        <div style={styles.gap}></div> {/* 用于设置滚动显示与卡片之间的间距 */}
        {loggedIn && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <Row gutter={[16, 16]} style={{ width: '100%', justifyContent: 'center' }}>
              {consultants.map((consultant, index) => (
                <Col key={index} {...getColProps()}>
                  <Link to={`/review/?Con_ID=${consultant.Con_ID}`}>
                    <div style={styles.cardContainer}>
                      <Card hoverable>
                        <Meta title={`${consultant.FName} ${consultant.LName}`} description={<div style={styles.description}>Email: {consultant.Email}</div>} />
                        <p>Age: {consultant.Age}</p>
                        <p>Height: {consultant.Height} cm</p>
                        <p>Weight: {consultant.Weight} kg</p>
                        <p>Diet ID: {consultant.Diet_ID}</p>
                        <p>Ideal Fat: {consultant.Ideal_Fat}%</p>
                        <p>Registration Date: {consultant.Reg_Date}</p>
                        <div style={styles.linkContainer}>
                          查看詳情
                        </div>
                      </Card>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default CustomHeader;
