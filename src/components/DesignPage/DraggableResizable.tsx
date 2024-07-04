import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import {
  Button,
  ConfigProvider,
  Modal,
  Form,
  Input,
  Menu,
  notification,
  QRCode,
  Space,
  message,
} from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import type { MenuProps } from 'antd';
import tiktokIcon from '../stickers/pics/tiktok.svg';

import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];

interface DraggableResizableProps {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'sticker' | 'button' | 'link';
  src?: string;
  text?: string;
  link?: string;
  advanced?: string;
  textStyles?: {
    bold?: boolean;
    underline?: boolean;
    bgColor?: string;
    textColor?: string;
    italic?: boolean;
    fontSize?: number;
  };
  onDragStop: (id: number, x: number, y: number) => void;
  onResizeStop: (
    id: number,
    width: number,
    height: number,
    x: number,
    y: number
  ) => void;
  onSelect: (id: number) => void;
  onUpdate: (id: number, text: string, link: string, advanced: string) => void;
  selected: boolean;
  setIsEditing: (isEditing: boolean) => void;
  published: boolean; // 新增的发布状态
}

const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const DraggableResizable: React.FC<DraggableResizableProps> = ({
  id,
  x,
  y,
  width,
  height,
  type,
  src,
  text,
  link,
  advanced,
  textStyles = {},
  onDragStop,
  onResizeStop,
  onSelect,
  onUpdate,
  selected,
  setIsEditing,
  published,
}) => {
  const textStyle = {
    fontWeight: textStyles.bold ? 'bold' : 'normal',
    textDecoration: textStyles.underline ? 'underline' : 'none',
    backgroundColor: textStyles.bgColor,
    color: textStyles.textColor,
    fontStyle: textStyles.italic ? 'italic' : 'normal',
    fontSize: textStyles.fontSize,
  };

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      type: 'divider',
    },
    {
      key: 'sub1',
      label: 'Live Stream Interactive Features',
      children: [
        { key: 'generateQRCode', label: 'Generate QR Code and Link' },
        { key: 'couponMessage', label: 'Coupon Received Message' },
        {
          key: 'liveStreamMessage',
          label: 'Live Stream Subscribed Message',
        },
      ],
    },
  ];

  const [api, contextHolder] = notification.useNotification();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isQRModalVisible, setIsQRModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textLink, setTextLink] = React.useState(
    'https://www.tiktok.com/explore'
  );
  const [messageApi, messageHolder] = message.useMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(textLink).then(() => {
      messageApi.open({
        type: 'success',
        content: 'Copy Successfully!',
      });
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let stickerLocked = false;

  const handleButtonClick = () => {
    if (published) {
      setTimeout(() => {
        if (link) {
          console.log('Opening link:', link);
          window.open(link, '_blank');
        } else if (advanced === 'liveStreamMessage') {
          console.log('Showing live notification');
          // 显示liveStreamMessage通知的逻辑
          api.success({
            message: 'Live Stream Subscribed!',
            description:
              'You have successfully subscribed to the live stream. Stay tuned for updates!',
            placement: 'top',
          });
        } else if (advanced === 'couponMessage') {
          console.log('Showing coupon notification');
          // 显示couponMessage通知的逻辑
          api.success({
            message: 'Coupon Received!',
            description:
              'You have successfully received a coupon. Enjoy your discount!',
            placement: 'top',
          });
        } else if (advanced === 'generateQRCode') {
          console.log('Showing QR code');
          showModal(); // 使用 showModal 函数
          // 显示QR code的逻辑
        }
      }, 100); // 延迟100毫秒
    } else {
      console.log('Showing modal');
      stickerLocked = true;
      setIsModalVisible(true);
      form.setFieldsValue({ text, link, advanced: selectedMenuItem });
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      // 更新状态
      onUpdate(id, values.text, values.link, values.advanced);
      setSelectedMenuItem(values.advanced); // 更新 selectedMenuItem 状态

      stickerLocked = false;
      setIsModalVisible(false);
      console.log('Form values:', values);
    } catch (info) {
      console.log('Validate Failed:', info);
    }
  };

  const handleModalCancel = () => {
    stickerLocked = false;
    setIsModalVisible(false);
  };

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('Menu item clicked:', e.key);
    setSelectedMenuItem(e.key);
    // console.log('Selected menu item updated to:', e.key);
    form.setFieldsValue({ advanced: e.key }); // 实时更新表单的 advanced 字段
  };

  useEffect(() => {
    console.log('Selected menu item updated to:', selectedMenuItem);
  }, [selectedMenuItem]);

  const handleLinkDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (link) {
      window.open(link, '_blank');
    }
  };

  const handleClick = () => {
    if (!stickerLocked) {
      onSelect(id);
    } else {
      console.log('Sticker is locked, cannot select.');
    }
  };

  return (
    <>
      {contextHolder}
      <Rnd
        size={{ width, height }}
        position={{ x, y }}
        onDragStop={(e, d) => onDragStop(id, d.x, d.y)}
        onResizeStop={(e, direction, ref, delta, position) =>
          onResizeStop(
            id,
            ref.offsetWidth,
            ref.offsetHeight,
            position.x,
            position.y
          )
        }
        bounds="parent"
        onClick={handleClick}
        style={{ border: selected ? '1px dashed red' : 'none' }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {type === 'sticker' && src && (
            <img
              src={src}
              alt={`element-${id}`}
              style={{ width: '100%', height: '100%' }}
            />
          )}
          {type === 'sticker' && text && (
            <div
              style={{
                ...textStyle,
                width: '100%',
                height: '100%',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {text}
            </div>
          )}
          {type === 'button' && (
            <div
              style={{
                ...textStyle,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: `linear-gradient(90deg, ${colors2.join(
                        ', '
                      )})`,
                      colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(
                        colors2
                      ).join(', ')})`,
                      colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(
                        colors2
                      ).join(', ')})`,
                      lineWidth: 0,
                    },
                  },
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  style={{ width: '100%', height: '100%' }}
                  onClick={handleButtonClick}
                  href={link}
                >
                  {text}
                </Button>
              </ConfigProvider>
            </div>
          )}
          {type === 'link' && (
            <div
              style={{
                ...textStyle,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onDoubleClick={handleLinkDoubleClick}
            >
              <a href="#" style={{ width: '100%', height: '100%' }}>
                {text}
              </a>
            </div>
          )}
        </div>
      </Rnd>
      <Modal
        title="Edit Button"
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        visible={isModalVisible}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="text"
            label="Button Text"
            rules={[{ required: true, message: 'Please enter button text' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="link" label="Button Link">
            <Input />
          </Form.Item>
          <Form.Item name="advanced" label="Advanced">
            <Menu
              onClick={onClick}
              style={{ width: 480 }}
              defaultSelectedKeys={['']}
              mode="inline"
              items={items}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Share QRcode to Get Coupon!"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={300}
      >
        <>
        {messageHolder}
          <Space direction="vertical" align="center">
            <QRCode
              errorLevel="H"
              value="https://www.tiktok.com/explore"
              icon={tiktokIcon}
            />
            <Space.Compact style={{ width: '100%' }}>
              <Input
                placeholder="-"
                maxLength={60}
                value={textLink}
                onChange={(e) => setTextLink(e.target.value)}
              />
              <Button type="primary" onClick={handleCopy}>
                Copy
              </Button>
            </Space.Compact>
          </Space>
        </>
      </Modal>
      ;
    </>
  );
};

export default DraggableResizable;
