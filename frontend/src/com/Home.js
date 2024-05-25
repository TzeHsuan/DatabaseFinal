import React, { useState, useEffect } from 'react';
import { Rate, Card, Row, Col, Select, Layout, Carousel } from 'antd';
import { Link } from 'react-router-dom';

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
  const [searchTerm, setSearchTerm] = useState('0'); // 设置初始值为 '0' 对应 “營養師”
  const [cardData, setCardData] = useState([]);
  const [filteredCardData, setFilteredCardData] = useState([]);

  const fetchData = () => {
    // 模拟从后端获取卡片数据的 API 调用
    const dataFromBackend = [
      // 營養師数据
      
      {
        title: '張宸瑋',
        description: '健美冠軍',
        img: 'https://scontent-tpe1-1.cdninstagram.com/v/t39.30808-6/416575607_18266045107202244_6449706480810284076_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTcuc2RyLmYzMDgwOCJ9&_nc_ht=scontent-tpe1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=4mjTNEjh5PsQ7kNvgGYwVyR&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzI3MjA5MDE0ODQxNDIxNjEwNw%3D%3D.2-ccb7-5&oh=00_AYCA1KltpfFpLcV7Re8a8DbBXgy0Ocb-t3eRoYv_ovQhdw&oe=6655018D&_nc_sid=ee9879',
        productURL: '/product/1',
        category: '0', // 營養師
      },
      {
        title: '張宸瑋',
        description: '健美冠軍',
        img: 'https://scontent-tpe1-1.cdninstagram.com/v/t39.30808-6/416575607_18266045107202244_6449706480810284076_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTcuc2RyLmYzMDgwOCJ9&_nc_ht=scontent-tpe1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=4mjTNEjh5PsQ7kNvgGYwVyR&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzI3MjA5MDE0ODQxNDIxNjEwNw%3D%3D.2-ccb7-5&oh=00_AYCA1KltpfFpLcV7Re8a8DbBXgy0Ocb-t3eRoYv_ovQhdw&oe=6655018D&_nc_sid=ee9879',
        productURL: '/product/1',
        category: '0', // 營養師
      },
      {
        title: '張宸瑋',
        description: '健美冠軍',
        img: 'https://scontent-tpe1-1.cdninstagram.com/v/t39.30808-6/416575607_18266045107202244_6449706480810284076_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTcuc2RyLmYzMDgwOCJ9&_nc_ht=scontent-tpe1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=4mjTNEjh5PsQ7kNvgGYwVyR&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzI3MjA5MDE0ODQxNDIxNjEwNw%3D%3D.2-ccb7-5&oh=00_AYCA1KltpfFpLcV7Re8a8DbBXgy0Ocb-t3eRoYv_ovQhdw&oe=6655018D&_nc_sid=ee9879',
        productURL: '/product/1',
        category: '0', // 營養師
      },
      // 添加更多卡片数据
    ];

    setCardData(dataFromBackend);
    setFilteredCardData(dataFromBackend.filter(card => card.category === '0')); // 初始化时过滤数据
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (value) => {
    setSearchTerm(value);
    setFilteredCardData(cardData.filter(card => card.category === value));
  };

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
    image: {
      height: '200px',
      objectFit: 'contain',
      width: '100%',
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

      <h3>
        <Select
          defaultValue="0" // 默认值设置为 '0'，即 "營養師"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: '0', label: '營養師' },
            { value: '1', label: '諮商者' }
          ]}
        />
      </h3>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Row gutter={[16, 16]} style={{ width: '100%', justifyContent: 'center' }}>
          {filteredCardData.map((card, index) => (
            <Col key={index} {...getColProps()}>
              <Link to={card.productURL} style={styles.link}>
                <div style={styles.cardContainer}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={card.title}
                        src={card.img}
                        style={styles.image}
                      />
                    }
                  >
                    <Meta title={card.title} description={card.description} />

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
    </Content>
  );
};

export default Home;
