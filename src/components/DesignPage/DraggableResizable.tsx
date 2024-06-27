import React from 'react';
import { Rnd } from 'react-rnd';
import { Button, ConfigProvider } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';

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

  console.log('Rendering DraggableResizable with textStyle:', textStyle);

  const handleButtonClick = () => {
    setIsEditing(true);
  };

  const handleLinkDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
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
      onClick={() => onSelect(id)}
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
  );
};

export default DraggableResizable;
