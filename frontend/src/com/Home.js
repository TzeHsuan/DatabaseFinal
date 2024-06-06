import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Layout, Carousel } from 'antd';
import axios from 'axios';

const { Meta } = Card;
const { Content } = Layout;

const contentStyle = {
  width: '80%',
  height: '700px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  margin: 'auto',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url('https://www.iehealth7799.com/wp-content/uploads/2021/10/4-weeks-modified-diet.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
};
const contentStyle1 = {
  width: '80%',
  height: '700px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  margin: 'auto',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgKfGUvAr-B81ikvENa0LaIAG4fC_zH6b8qDUU95rNUQ&s')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
};

const Home = () => {
  const [cardData, setCardData] = useState([]);
  const [filteredCardData, setFilteredCardData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost/backend/diets.php'); // 确保URL正确
      const dataFromBackend = response.data;
      setCardData(dataFromBackend);
      setFilteredCardData(dataFromBackend); // 默认显示所有数据
    } catch (error) {
      console.error('获取数据失败', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    card: {
      cursor: 'pointer', // 设置悬停时显示鼠标指针变化
    },
    image: {
      height: '200px',
      objectFit: 'contain',
      width: '100%',
    },
    gap: {
      marginBottom: '40px', // 设置滚动显示与卡片之间的间距
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
    <Content style={{ width: '70%', margin: 'auto', justifyContent: 'center' }}>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}></h3>
        </div>
        <div>
          <h3 style={contentStyle1}></h3>
        </div>
      </Carousel>

      <div style={styles.gap}></div> {/* 用于设置滚动显示与卡片之间的间距 */}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Row gutter={[16, 16]} style={{ width: '100%', justifyContent: 'center' }}>
          {filteredCardData.map((card, index) => (
            <Col key={index} {...getColProps()}>
              <div style={styles.cardContainer}>
                <Card
                  hoverable
                  style={styles.card}
                  cover={
                    <img
                      alt={`${card.Diet_Fname} ${card.Diet_Lname}`}
                      src={card.img_url || 'https://via.placeholder.com/200'}
                      style={styles.image}
                    />
                  }
                >
                  <Meta title={`${card.Diet_Fname} ${card.Diet_Lname}`} />
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Content>
  );
};

export default Home;
