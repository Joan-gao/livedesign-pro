import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {}

const GeneratedTab: React.FC<Props> = () => {
  const [inputValue, setInputValue] = useState('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const placeholderIMG1 =
    'https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/5lVaoQAxDn9e55u7qNF5.jpg';
  const placeholderIMG2 =
    'https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/oXqKXlvxZSqV9ivfWZ21.jpg';
  const placeholderIMG3 =
    'https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/u8LhInJHbwuu5DntvP5Z.jpg';
  const placeholderIMG4 =
    'https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/AUDbh5NsUMK82HcC6F60.jpg';

  const navigate = useNavigate();

  // Show Image Preview and Enable 'Select' Button
  const handleEdit = (imageId: string) => {
    const imgElement = document.getElementById(imageId) as HTMLImageElement;
    const selectDesign = document.getElementById('selectDesign');

    if (selectDesign) {
      selectDesign.style.opacity = '1';
      selectDesign.style.cursor = 'pointer';
      selectDesign.setAttribute('aria-disabled', 'false');
    }

    if (imgElement) {
      setPreviewImage(imgElement.src);
      setIsPreviewVisible(true);
    }
  };

  // Closing Preview and Disabling 'Select' Button
  const handleClosePreview = () => {
    setIsPreviewVisible(false);
    setPreviewImage(null);
    const selectDesign = document.getElementById('selectDesign');

    if (selectDesign) {
      selectDesign.style.opacity = '0.6';
      selectDesign.style.cursor = 'default';
      selectDesign.setAttribute('aria-disabled', 'true');
    }
  };

  // Bring Selected Images to the Final Design Page
  const handleSelectDesign = () => {
    if (previewImage) {
      navigate('/DesignPage', { state: { image: previewImage } });
    }
  };

  return (
    <div className="w-375 top-0 flex flex-col place-items-center bg-[#240F14] rounded-md snap-mandatory snap-y z-10">
      <div className="flex flex-col w-4/5 gap-2">
        {/* Ai Text Responses */}
        <p className="text-[#CC8F99]">AI Bot</p>
        <div className="text-white text-base text-left bg-[#4A2129] border-none rounded-md h-fit px-3 py-3">
          <p className="text-white">
            Rotogravure, Lola's mind is like a short stack of pancakes. 256
            color radial laser ray bg --v 6.0 --s 250
          </p>
        </div>

        <p className="text-[#CC8F99]">AI Bot</p>
        <div className="text-white text-base text-left bg-[#4A2129] border-none rounded-md h-fit px-3 py-3">
          <p className="text-white">
            Rotogravure, Lola's mind is like a short stack of pancakes. 256
            color radial laser ray bg --v 6.0 --s 250
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneratedTab;
