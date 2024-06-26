import React, { useState, useEffect } from 'react';
import { Progress, Card, Row, Col, Space, Input } from 'antd';
import { Select } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';

const { Meta } = Card;

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [cardData, setCardData] = useState([]);
  const savedSession = reactLocalStorage.get('session');
  const [searchValue, setSearchValue] = useState(searchParams.get('title') || '');
  const [type, setType] = useState(searchParams.get('type') || null);
  const [category, setCategory] = useState(searchParams.get('category') || null);
  const history = useHistory();

  const fetchData = async (searchValue) => {
    try {
      let url = 'http://localhost:5001/event-search';

      if (type !== null || searchValue !== '' || category !== null) {
        url += '/?';

        if (type !== null) {
          url += `type=${type}`;
        }

        if (searchValue !== '') {
          url += `&title=${encodeURIComponent(searchValue)}`;
        }

        if (category !== null) {
          url += `&category=${category}`;
        }
      }

      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data)) {
        const dataFromBackend = data.map((group) => ({
          uid: savedSession,
          gid: group._id,
          title: group.title,
          description: group.description,
          type: group.type,
          category: group.category,
          price: group.price,
          end_date: group.end_date,
          least: group.least,
          number: group.number,
          img: group.image,
        }));
        setCardData(dataFromBackend);
      } else {
        throw new Error('Data is not an array');
      }
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

  useEffect(() => {
    fetchData(searchValue);
  }, [type, searchValue, category]);

  const handleSearch = () => {
    fetchData(searchValue);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '24px',
    },
    cardContainer: {
      width: '100%',
    },
    card: {
      height: '350px', // Set the height of the card
      overflow: 'hidden', // Hide overflowing content
    },
    image: {
      width: '100%', // Make sure the image takes up the full width of the card
      height: '200px',
      objectFit: 'cover', // Use cover to make sure the aspect ratio of the image is preserved
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
    <div style={styles.container}>
      <div style={{ padding: '24px', width: '70%' }}>
        <div style={styles.searchContainer}>
          <Input.Search
            placeholder="搜尋營養師"
            style={{ width: '50%' }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <Row gutter={[16, 16]} style={{ width: '100%', justifyContent: 'center' }}>
            {cardData.map((card, index) => (
              <Col key={index} {...getColProps()}>
              <Link to={`/detail/?gid=${card.gid}&uid=${card.leader}`}>
                <div style={styles.cardContainer}>
                  <Card hoverable style={styles.card}>
                    <Link to={`/detail/?gid=${card.gid}&uid=${card.leader}`}>
                      <img alt={card.title} src={card.img} style={styles.image} />
                    </Link>
                    <Meta
                      title={card.title}
                      description={
                        <div style={{ width: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {card.description}
                        </div>
                      }
                    />
                    {/* <Meta title={card.title} description={card.description} /> */}
                    <Progress
                      percent={Math.round((card.number / card.least) * 100)}
                      status="active"
                      strokeColor={{
                        from: '#108ee9',
                        to: '#87d068'
                      }}
                    />
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
      </div>
    </div>
  );
};

export default Search;
