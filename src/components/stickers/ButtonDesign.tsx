import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './Button.css';

interface ButtonProps {
  id: number;
  text: string;
  link: string;
  onDrop: (id: number, item: any) => void;
  onUpdate: (id: number, newText: string, newLink: string) => void;
}

const Button: React.FC<ButtonProps> = ({ id, text, link, onDrop, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [tempText, setTempText] = useState(text);
  const [tempLink, setTempLink] = useState(link);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'component',
    item: { id, text, link },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, dropRef] = useDrop(() => ({
    accept: 'component',
    drop: (item: any, monitor) => onDrop(id, item),
  }));

  const handleSave = () => {
    onUpdate(id, tempText, tempLink);
    setEditMode(false);
  };

  const renderEditView = () => (
    <div>
      <input type="text" value={tempText} onChange={(e) => setTempText(e.target.value)} />
      <input type="text" value={tempLink} onChange={(e) => setTempLink(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );

  const handleClick = () => {
    if (!editMode && link) {
      window.location.href = link;
    }
  };

  const renderNormalView = () => (
    <button onClick={handleClick} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {text}
    </button>
  );

  return (
    <div ref={(node) => dragRef(dropRef(node))}>
      {editMode ? renderEditView() : renderNormalView()}
      <button onClick={() => setEditMode(true)}>Edit</button>
    </div>
  );
};

export default Button;
