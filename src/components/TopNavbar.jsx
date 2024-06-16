import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

// Import AI Icons
import { faStar } from '@fortawesome/free-solid-svg-icons';


const TopNavbar = ({ className }) => {
  // Styling for AI Icons Div
  const topLeftIcons = {
    display: 'flex',
    flexDirection: 'row',
    gap: '12px'
  };
    
  return (
    <div className="top-navbar">
      <div style={topLeftIcons}>
        <FontAwesomeIcon icon={faTv} className='icon'/>
        <Link to="/FrontPage"><FontAwesomeIcon icon={faStar} className='icon'/></Link>
      </div>
      <h2>Following  |   <span>For You</span></h2>
      <FontAwesomeIcon icon={faSearch} className='icon'/>
    </div>
  );
};

export default TopNavbar;
