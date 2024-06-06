import React, { useState, useEffect } from 'react';
import { Layout, Table, Avatar, Menu, Dropdown, Button, Space, Form, Input, Tabs } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import moment from 'moment';

const { Header, Content } = Layout;
const { TextArea } = Input;
const { TabPane } = Tabs;

const Review = () => {
  const location = useLocation();
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [conID, setConID] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const conID = params.get('Con_ID');
    setConID(conID);
    const session = reactLocalStorage.get('Diet_ID');
    const userType = reactLocalStorage.get('User_Type');
    if (session && userType) {
      fetchUserData(session, userType);
      fetchRecords(conID);
      fetchComments(conID);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [location]);

  const fetchUserData = async (session, userType) => {
    try {
      const response = await axios.get(`http://localhost/backend/diet.php?session=${session}&userType=${userType}`);
      const { dietData } = response.data;
      if (dietData) {
        const { Diet_Fname, Diet_Lname } = dietData;
        setUserData({
          hoverText: `${Diet_Fname} ${Diet_Lname}`,
        });
      } else {
        console.error('Invalid user data:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  const fetchRecords = async (conID) => {
    try {
      const response = await axios.get(`http://localhost/backend/get_records.php?Con_ID=${conID}`);
      const records = response.data.map((record) => ({
        key: record.Record_ID,
        date: moment(record.Date).format('YYYY-MM-DD'),
        protein: record.Protein,
        carbs: record.Carb,
        fat: record.Fat,
        workout: record.Sports,
        cardio: record.Aero,
        weight: record.Weight,
      }));
      setDataSource(records);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const fetchComments = async (conID) => {
    try {
      const response = await axios.get(`http://localhost/backend/get_comments.php?Con_ID=${conID}`);
      const sortedComments = response.data.sort((a, b) => new Date(b.date) - new Date(a.date)); // 确保前端按时间降序排序
      setComments(sortedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleMenuClick = async ({ key }) => {
    if (key === 'logout') {
      reactLocalStorage.remove('Diet_ID');
      setLoggedIn(false);
      setUserData({});
      history.push('/login');
    } else if (key === 'profile') {
      try {
        const session = reactLocalStorage.get('Diet_ID');
        const response = await axios.get(`http://localhost/backend/diet.php?session=${session}`);
        const { Diet_ID } = response.data;
        if (Diet_ID) {
          history.push(`/diet/?uid=${session}`);
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    }
  };

  const handleCommentSubmit = async () => {
    const Diet_ID = reactLocalStorage.get('Diet_ID');  // 获取 Diet_ID
    if (newComment.trim() === "") {
      return; // 评论为空，退出函数
    }
    try {
      await axios.post('http://localhost/backend/add_comment.php', {
        Con_ID: conID,
        comment: newComment,
        Diet_ID: Diet_ID  // 传递 Diet_ID 参数
      });
      setNewComment("");
      fetchComments(conID);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout">登出</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '蛋白質 (g)',
      dataIndex: 'protein',
      key: 'protein',
    },
    {
      title: '脂肪 (g)',
      dataIndex: 'fat',
      key: 'fat',
    },
    {
      title: '碳水化合物 (g)',
      dataIndex: 'carbs',
      key: 'carbs',
    },
    {
      title: '今天練什麽',
      dataIndex: 'workout',
      key: 'workout',
      render: (workout) => {
        const workoutMap = {
          0: '胸',
          1: '背',
          2: '腿',
          3: '肩',
          4: '休息',
          5: '其它'
        };
        return workoutMap[workout];
      },
    },
    {
      title: '今日有氧 (mins)',
      dataIndex: 'cardio',
      key: 'cardio',
    },
    {
      title: '體重 (kg)',
      dataIndex: 'weight',
      key: 'weight',
    },
  ];

  return (
    <Layout>
      <Header style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15%' }}>
            <Link to="/" style={{ marginRight: '16px', display: 'flex', alignItems: 'center', color: '#1890ff' }}>
              <span style={{ marginRight: '16px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '1.2em' }}>Chilltan</span>
            </Link>
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
        <div style={{ marginTop: '16px' }}>
          {loggedIn && (
            <>
              <Table
                rowKey="key"
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
              <div style={{ marginTop: '16px' }}>
                <Form onFinish={handleCommentSubmit}>
                  <Form.Item>
                    <TextArea
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="添加新评论"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Space>
                      <Button type="primary" htmlType="submit">
                        提交
                      </Button>
                      <Link to={`/diet/?uid=${reactLocalStorage.get('Diet_ID')}`}>
                        <Button type="default">
                          返回
                        </Button>
                      </Link>
                    </Space>
                  </Form.Item>
                </Form>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '70%' }}>
                  <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="过往评论" key="1">
                      {comments.map((comment, index) => (
                        <p key={index}><b>{comment.title}:</b> {comment.comment} ({comment.date})</p>
                      ))}
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default Review;
