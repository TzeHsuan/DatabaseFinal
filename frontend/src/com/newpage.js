import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Layout, message, List, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';

const { Content } = Layout;

const DietList = () => {
  const [diets, setDiets] = useState([]);
  const history = useHistory();
  const session = reactLocalStorage.get('Con_ID');

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const response = await axios.get('http://localhost/backend/diets.php');
        if (response.status === 200) {
          setDiets(response.data);
        } else {
          console.log('获取diet信息失败');
        }
      } catch (error) {
        console.log('错误：', error);
      }
    };

    fetchDiets();
  }, []);

  const handleDietClick = async (dietId) => {
    console.log(`Clicked Diet_ID: ${dietId}`);
    try {
      const response = await axios.post('http://localhost/backend/updateDietId.php', {
        session,
        dietId
      });
      console.log('Response:', response);
      if (response.status === 200) {
        message.success('Diet_ID 更新成功');
        history.push(`/user/?uid=${session}`);
      } else {
        message.error('Diet_ID 更新失败');
      }
    } catch (error) {
      console.log('错误：', error);
      message.error('Diet_ID 更新失败');
    }
  };

  return (
    <Content style={{ width: '70%', margin: 'auto', justifyContent: 'center' }}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={diets}
        renderItem={(diet) => (
          <List.Item
            key={diet.Diet_ID}
            onClick={() => handleDietClick(diet.Diet_ID)}
          >
            <Card hoverable>
              <Row>
                <Col flex="120px">
                  <img
                    width={120}
                    alt={`${diet.Diet_Fname} ${diet.Diet_Lname}`}
                    src={diet.img_url || 'https://via.placeholder.com/120'}
                  />
                </Col>
                <Col flex="auto">
                  <Card.Meta
                    title={`${diet.Diet_Fname} ${diet.Diet_Lname}`}
                    description={<p>{diet.Intro}</p>}
                  />
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </Content>
  );
};

export default DietList;
