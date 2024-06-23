import React from 'react';

interface DesignSectionProps {
  imageData: string; // Assuming imageData is a string URL
}

const DesignSection: React.FC<DesignSectionProps> = ({ imageData }) => {
  return (
    <div id='design' className="main-layer absolute w-375 h-667 rounded-[25px]">
      <img src={imageData} alt="Design Background" className="w-full h-full object-cover rounded-[25px]" />
    </div>
  );
};

export default DesignSection;
