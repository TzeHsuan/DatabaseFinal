import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Progress, Button, Tabs, Affix } from 'antd';
import { BrowserRouter as Router, useHistory  } from 'react-router-dom';

const { Content } = Layout;
const { TabPane } = Tabs;

const UserGroupList = () => {
  const history = useHistory();
  const [consultantInfo, setConsultantInfo] = useState({
    Age: null,
    Height: null,
    TargetWeight: null,
    CurrentWeight: null
  });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const consultantId = localStorage.getItem('Con_ID'); // 假设Con_ID存储在localStorage

    if (consultantId) {
      fetchConsultantData(consultantId);
    }
  }, []);

  const handleButtonClick = () => {
    history.push('/create');
  };

  const fetchConsultantData = (consultantId) => {
    axios.get(`http://localhost/backend/get_user_info.php?con_id=${consultantId}`)
      .then(response => {
        setConsultantInfo(response.data.consultantInfo);
        setReviews(response.data.reviews);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const progressPercent = consultantInfo.CurrentWeight && consultantInfo.TargetWeight
    ? Math.floor((consultantInfo.CurrentWeight / consultantInfo.TargetWeight) * 100)
    : 0;

  return (
    <Router>
      <Layout style={{ background: 'white' }}>
        <Content style={{ width: '80%', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ marginBottom: '1rem' }}>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <h3>年龄: {consultantInfo.Age}</h3>
                <h3>身高 (cm): {consultantInfo.Height}</h3>
                <h3>初始体重 (kg): {consultantInfo.TargetWeight ?? 'N/A'}</h3>
                <h3>当前体重 (kg): {consultantInfo.CurrentWeight ?? 'N/A'}</h3>
                <Progress percent={progressPercent} />
              </div>
              <Affix offsetTop={0}>
                <Button type="primary" style={{ marginBottom: '1rem', width: '30%' }} onClick={handleButtonClick}>查看詳情</Button>
              </Affix>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '70%' }}>
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="评论回复" key="1">
                  {reviews.map((review, index) => (
                    <p key={index}><b>{review.title}:</b> {review.comment} ({review.date})</p>
                  ))}
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default UserGroupList;
