import React, { useState, useEffect } from 'react';
import { Layout, Button, Dropdown, Avatar, Menu, Space } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';

const { Header } = Layout;

const CustomHeader = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(true);
  const [userData, setUserData] = useState({});
  const [saveSession, setSaveSession] = useState(null);

  useEffect(() => {
    const session = reactLocalStorage.get('session');
    setSaveSession(session);
    if (session) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }


    const fakeUserData = {
      hoverText: 'Hover me',
      userIcon: <img src="https://scontent-tpe1-1.cdninstagram.com/v/t51.2885-19/408491328_3666799066936960_2189607764010028927_n.jpg?stp=dst-jpg_s100x100&_nc_cat=109&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=eTxN8zQqNlwQ7kNvgG4e2Rp&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-tpe1-1.cdninstagram.com&oh=00_AYDT8m3ANogY5Rd4TAs4gGpXGCmrnOhk6ft7SQopvOipOg&oe=6654A99C" />,
    };

    setUserData(fakeUserData);
  }, []);

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      setLoggedIn(false);
    }
    // 处理其他菜单项的点击事件
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">
        <Link to={`/user/?uid=${saveSession}`}>
          個人頁面
        </Link>
      </Menu.Item>
      <Menu.Item key="logout">
        登出
      </Menu.Item>
    </Menu>
  );

  const handleButtonClicked = () => {
    // 在这里执行其他操作或导航到其他页面
  };
  return (
    <Header style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15%' }}>
          <Link to="/" style={{ marginRight: '16px', display: 'flex', alignItems: 'center', color: '#1890ff' }}>
            <span style={{ marginRight: '16px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '1.2em' }}>Chilltan</span>
          </Link>
          <span style={{ marginRight: '16px' }}>
            <Button type="primary" style={{ borderRadius: '5px' }} onClick={handleButtonClicked}>
              <Link to="/create" style={{ color: '#fff' }}>記錄</Link>
            </Button>
          </span>
          <Button type="primary" style={{ borderRadius: '5px' }} onClick={handleButtonClicked}>
            <Link to="/search" style={{ color: '#fff' }}>搜尋</Link>
          </Button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '15%' }}>
          {loggedIn ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '43px' }}>
              <Dropdown trigger={['click']} dropdownRender={() => menu}>
                <span style={{ cursor: 'pointer' }}>
                  <Space>
                    <Avatar icon={userData.userIcon} />
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
  );
};

export default CustomHeader;
//   return (
//     <Header style={{ background: '#fff' }}>
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15%' }}>
//           <Link to="/" style={{ marginRight: '16px', display: 'flex', alignItems: 'center' }}>
//             <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" alt="Logo" style={{ width: 'auto', height: '30px' }} />
//             <span style={{ marginRight: '16px' }}>Chilltan</span>
//           </Link>
          
//           <span style={{ marginRight: '16px' }}>
//             <Button type="primary" onClick={handleButtonClicked}>
//             <Link to="/create">提案!</Link>
//           </Button>
//           </span><Button type="primary" onClick={handleButtonClicked}>
//               <Link to="/search">搜尋</Link>
//             </Button>
//         </div>
        
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '15%' }}>
//           {loggedIn ? (
//             <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '43px' }}>
//               <Dropdown trigger={['click']} dropdownRender={() => menu}>
//                 <span style={{ cursor: 'pointer' }}>
//                   <Space>
//                     <Avatar icon={userData.userIcon} />
//                     {userData.hoverText}
//                   </Space>
//                 </span>
//               </Dropdown>
//             </span>
//           ) : (
//             <>
//               <span style={{ marginRight: '16px' }}>
//                 <Link to="/login">
//                   <Button>登入</Button>
//                 </Link>
//               </span>
//               <Link to="/register">
//                 <Button>注冊</Button>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </Header>
//   );
// };

// export default CustomHeader;
