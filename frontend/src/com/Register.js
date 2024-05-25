import { Link, useHistory } from 'react-router-dom';
import { LockOutlined, UserOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Checkbox, Row, Col, Select } from 'antd';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage'; // 导入useLocalStorage钩子函数

const { Option } = Select;

const layout = {
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

export default function Register() {
  const history = useHistory();
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try{
      const response = await axios.post('http://localhost:7777/signup', {
        email: values.email,
        password: values.password,
    });
    console.log('Register success', response.data);
    history.push('/login');
  } catch (error) {
    console.error('Register failed', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row>
      <Col span={17}>
        <img
          src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="background"
          style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
        />
      </Col>
      <Col span={7} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '70%', marginTop: '10%' }}>
          <div style={{ textAlign: 'center', marginBottom: '1em' }}>
            <Link to="/">
              <img
                src="https://scontent-tpe1-1.cdninstagram.com/v/t51.2885-19/408491328_3666799066936960_2189607764010028927_n.jpg?stp=dst-jpg_s100x100&_nc_cat=109&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=eTxN8zQqNlwQ7kNvgG4e2Rp&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-tpe1-1.cdninstagram.com&oh=00_AYDT8m3ANogY5Rd4TAs4gGpXGCmrnOhk6ft7SQopvOipOg&oe=6654A99C"
                alt="logo"
                style={{ width: '30%', marginBottom: '1em' }}
              />
              <h2>Chilltan</h2>
            </Link>
            <p>歡迎加入！</p>
          </div>
          <Form
            {...layout}
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '請輸入用戶名!' }, { type: 'Username', message: '請輸入有效的用戶名!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: '請輸入Email!' }, { type: 'email', message: '請輸入有效的电子信箱!' }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '請輸入密碼!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: '請再次輸入密碼!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="ConfirmPassword" />
            </Form.Item>

            <Form.Item {...tailLayout} style={{ marginBottom: '1em' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>我已閱讀並接受使用條款</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" block>
                註冊
              </Button>
            </Form.Item>

            <Divider>其他註冊方式</Divider>
            <Row justify="center">
              <Col span={4}>
                <Button
                  icon={<GoogleOutlined />}
                  shape="circle"
                  size="large"
                />
              </Col>
            </Row>
            <br/>
            <Row justify="center">
              <Col>
                已經成為會員？
                <Link to="/login" style={{ marginLeft: '5px' }}>
                  登入帳號。
                </Link>
              </Col>
            </Row>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
