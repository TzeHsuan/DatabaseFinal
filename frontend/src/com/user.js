import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Card, Layout } from 'antd';
const { Meta } = Card;
const { Content } = Layout;

export default class UserGroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diets: [],
      consultantId: null,
    };
  }

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData() {
    // 从本地存储或通过props获取consultantId
    const consultantId = localStorage.getItem('ID'); // 假设ID存储在localStorage
    this.setState({ consultantId });

    if (consultantId) {
      this.fetchDiets(consultantId);
    }
  }

  fetchDiets(consultantId) {
    axios.get(`http://localhost:5000/diets?consultantId=${consultantId}`)
      .then(response => {
        this.setState({
          diets: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderDiets() {
    return this.state.diets.map((diet, index) => (
      <Col key={index} span={8}>
        <Card
          hoverable
          cover={<img alt="example" src="https://via.placeholder.com/300.png" />} // 例子图片地址
        >
          <Meta title={`${diet.Diet_Fname} ${diet.Diet_Lname}`} description={`ID: ${diet.Diet_ID}`} />
        </Card>
      </Col>
    ));
  }

  render() {
    return (
      <Layout className="layout">
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Row gutter={16}>
            {this.renderDiets()}
          </Row>
        </Content>
      </Layout>
    );
  }
}
