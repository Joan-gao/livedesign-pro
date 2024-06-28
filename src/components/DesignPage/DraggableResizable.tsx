import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { Button, ConfigProvider, Modal, Form, Input, Menu } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import type { MenuProps } from 'antd';

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
  onUpdate: (id: number, text: string, link: string) => void;
  selected: boolean;
  setIsEditing: (isEditing: boolean) => void;
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
  textStyles = {},
  onDragStop,
  onResizeStop,
  onSelect,
  onUpdate,
  selected,
  setIsEditing,
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
        { key: 'liveStreamMessage', label: 'Live Stream Subscribed Message' },
      ],
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  // 局部变量来同步锁定状态
  let stickerLocked = false;

  const handleButtonClick = () => {
    stickerLocked = true; // 使用局部变量锁定sticker
    setIsModalVisible(true);
    form.setFieldsValue({ text, link });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      onUpdate(id, values.text, values.link);
      stickerLocked = false; // 使用局部变量解锁sticker
      setIsModalVisible(false);
      // console.log('Updated Button text:', values.text); // 添加检查 title 的 console.log
      // console.log('Updated Button link:', values.link); // 添加检查 link 的 console.log
    } catch (info) {
      console.log('Validate Failed:', info);
    }
  };

  const handleModalCancel = () => {
    stickerLocked = false; // 使用局部变量解锁sticker
    setIsModalVisible(false);
  };

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

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <>
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
        onClick={handleClick} // 在sticker未被锁定时才允许选择
        style={{
          border: selected ? '1px dashed red' : 'none',
        }}
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
    </>
  );
};

export default DraggableResizable;
