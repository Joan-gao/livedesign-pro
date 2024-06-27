import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {}

const CreationTab: React.FC<Props> = () => {
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
    <div className="w-375 top-0 flex flex-col place-items-center bg-[#240F14] rounded-25 snap-mandatory snap-y z-10">
      <div className="flex flex-col w-[90%] mx-auto gap-4">
        {/* Ai Text Responses */}
        <p className="text-[#CC8F99]">Descriptions</p>
        <div className="w-ful gap-3">
          {/* User Prompt box */}
          <textarea
            id="userPrompt"
            className="text-white text-sm text-left bg-[#4A2129] border-none rounded-md w-full h-24 py-1.5 px-3 resize-none"
            placeholder="Enter your text here"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInputValue(e.target.value)
            }
          />
        </div>

        <p className="text-[#CC8F99]">Select Model</p>
        <div className='grid justify-center grid-rows-[auto] grid-cols-4 gap-2'>
          <div className='flex flex-col items-center'>
            <img className="w-full h-full overflow-hidden" src={placeholderIMG1} alt="Model 1"></img>
            <p className='text-white'>Model 1</p>
          </div>
          <div className='flex flex-col items-center'>
            <img className="w-full h-full overflow-hidden" src={placeholderIMG2} alt="Model 2"></img>
            <p className='text-white'>Model 2</p>
          </div>
          <div className='flex flex-col items-center'>
            <img className="w-full h-full overflow-hidden" src={placeholderIMG3} alt="Model 3"></img>
            <p className='text-white'>Model 3</p>
          </div>
          <div className='flex flex-col items-center'>
            <img className="w-full h-full overflow-hidden" src={placeholderIMG4} alt="Model 4"></img>
            <p className='text-white'>Model 4</p>
          </div>
        </div>

        <p className="text-[#CC8F99]">Aspect Ratio</p>
        <div className='flex flex-row items-center gap-4'>
          <button className='bg-[#4A2129] rounded-md w-[100px] h-[100px] flex flex-col items-center justify-center'>
            <div className='border-2 border-white border-solid w-[40px] h-[40px]'></div>
            <p className='text-white'>1:1</p>
          </button>
          <button className='bg-[#4A2129] rounded-md w-[100px] h-[100px] flex flex-col items-center justify-center'>
            <div className='border-2 border-white border-solid w-[32px] h-[64px]'></div>
            <p className='text-white'>9:16</p>
          </button>
        </div>

        <button className="5 bg-[#FC2B55] text-white w-full border-none rounded-md py-1.5 px-6">
          Generate
        </button>
      </div>
    </div>
  );
};

export default CreationTab;
