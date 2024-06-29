import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserFriends, faPlus, faInbox, fa7, faUser } from '@fortawesome/free-solid-svg-icons';
import { BorderTopOutlined } from '@ant-design/icons';
import { Button, notification, Space } from 'antd';

const BottomNavbar = ({ className }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      placement,
    });
  };

  return (
    <div className="bottom-navbar">
      {contextHolder}
      <div className="nav-item">
        <Space>
          <Button type="primary" onClick={() => openNotification('top')} icon={<BorderTopOutlined />}>
            top
          </Button>
        </Space>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faHouse} className="icon active" />
        <span className="item-name active">Home</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faUserFriends} className="icon" />
        <span className="item-name">Friends</span>
      </div>
      <Link to="/FrontPage">
        <div className="nav-item">
          <FontAwesomeIcon icon={faPlus} className="icon plus" />
          <span className="item-name">Create</span>
        </div>
      </Link>
      <div className="nav-item">
        <FontAwesomeIcon icon={fa7} className="notification" />
        <FontAwesomeIcon icon={faInbox} className="icon" />
        <span className="item-name">Inbox</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faUser} className="icon" />
        <span className="item-name">Profile</span>
      </div>
    </div>
  );
}

export default BottomNavbar;
