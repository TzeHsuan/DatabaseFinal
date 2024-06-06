import { Link, useHistory } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Checkbox, Row, Col, Select } from 'antd';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';

const { Option } = Select;

const layout = {
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperPanCol: { span: 24 },
};

export default function Login() {
  const history = useHistory();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);

    const postData = {
      Email: values.type === 'consultant' ? values.Email : null,
      Diet_ID: values.type === 'diet' ? values.Email : null, // 在这里使用 Email 字段的值作为 Diet_ID
      Password: values.Password,
      type: values.type,
    };

    const url = 'http://localhost/backend/login_check.php';

    try {
      const response = await axios.post(url, postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Sign in successful', response.data);

      if (response.data && response.data.msg === 0 && response.data.session) {
        const { session, userType } = response.data;
  
        // 根据用户类型设置不同的键
        if (userType === 1) {
            reactLocalStorage.set('Diet_ID', session); // 为营养师设置 Diet_ID
        } else {
            reactLocalStorage.set('Con_ID', session); // 为膳食顾问设置 Con_ID
        }
        
        reactLocalStorage.set('User_Type', userType);  // 保存 userType 到本地存储
  
        console.log('Received session: ', session);
        console.log('Received userType: ', userType);
  
        if (userType === 1) {
            history.push(`/diet/?uid=${session}`); // 跳转到 diet 用户的特定页面
        } else {
            history.push('/'); // 跳转到最初始页面
        }
      } else {
        console.error('Sign in failed: No valid data received from backend');
      }
    } catch (error) {
      console.error('Sign in failed', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row>
      <Col span={17}>
        <img
          src="https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=600"
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
            <p>歡迎回來！</p>
          </div>
          <Form
            {...layout}
            name="login"
            initialValues={{ remember: true, type: 'consultant' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="type"
              rules={[{ required: true, message: 'Please select your login type!' }]}
            >
              <Select
                placeholder="Select your login type"
                allowClear
              >
                <Option value="consultant">諮商者</Option>
                <Option value="diet">營養師</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="Email"
              rules={[{ required: true, message: '請輸入用戶名!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Admin or User" />
            </Form.Item>

            <Form.Item
              name="Password"
              rules={[{ required: true, message: '請輸入密碼!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item {...tailLayout} style={{ marginBottom: '1em' }}>
              <Row justify="space-between">
                <Col>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>自動登入</Checkbox>
                  </Form.Item>
                </Col>
                <Col>
                  <a href="#">忘記密碼</a>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" block>
                登入
              </Button>
            </Form.Item>

            <Row justify="center">
              <Col>
                尚未成為會員？
                <Link to="/register" style={{ marginLeft: '5px' }}>
                  註冊帳號。
                </Link>
              </Col>
            </Row>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
