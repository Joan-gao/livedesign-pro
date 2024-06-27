import React from 'react';
import './Link.css';

interface LinkProps {
  url: string;
  text: string;
}

const Link: React.FC<LinkProps> = ({ url, text }) => {
  return (
    <a href={url} className="custom-link">
      {text}
    </a>
  );
};

export default Link;
