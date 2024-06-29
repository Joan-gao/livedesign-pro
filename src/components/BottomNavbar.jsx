import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUserFriends,
  faPlus,
  faInbox,
  fa7,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
// import { Button, Space, notification } from 'antd';
// import  { NotificationArgsProps } from 'antd';

const BottomNavbar = ({ className }) => {
  const Context = React.createContext({ name: 'Default' });
  // const [api, contextHolder] = notification.useNotification();

  // const openNotificationWithIcon = (type) => {
  //   console.log('Notification type:', type); // Add this line for debugging
  //   api[type]({
  //     message: 'Notification Title',
  //     description:
  //       'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  //   });
  // };

  return (
    <div className="bottom-navbar">
      <div className="nav-item">
        <FontAwesomeIcon icon={faHouse} className="icon active" />
          <span className="item-name active">Home</span>
        {/* <Button
          onClick={() => {
            console.log('click');
            openNotificationWithIcon('success');
          }}
        >
          Success
        </Button> */}
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
};

export default BottomNavbar;
