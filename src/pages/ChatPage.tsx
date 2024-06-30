import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {}

const ChatPage: React.FC<Props> = () => {
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
    <div className="z-101 absolute top-0 h-screen w-screen grid place-items-center">
      <div className="w-375 h-667 max-h-full relative top-0 flex flex-col gap-3 place-items-center bg-[#240F14] rounded-25 snap-mandatory snap-y z-10 overflow-scroll no-scrollbar">
        {/* Navigation to previous page and Page Title */}
        <div className="sticky top-0 left-0 w-full h-12 flex justify-around items-center">
          <div className="absolute w-4/5 top-0 h-12 flex items-center z-10 m-auto">
            <Link to="/GenerationPage">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-base text-white cursor-pointer"
              />
            </Link>
          </div>
          <h2 className="text-sm font-medium text-white text-shadow px-10 py-0">
            Event Page Generator
          </h2>
        </div>

        <div className="flex flex-col w-4/5 gap-2">
          {/* Ai Text Responses */}
          <p className="text-[#CC8F99]">AI Bot</p>
          <div className="text-white text-base text-left bg-[#4A2129] border-none rounded-xl h-fit px-3 py-3">
            <p className="text-white">
              Rotogravure, Lola's mind is like a short stack of pancakes. 256
              color radial laser ray bg --v 6.0 --s 250
            </p>
          </div>

          {/* Ai Design Output (4 designs) */}
          <div className="grid grid-cols-2 gap-3 mt-3.5">
            <div className="relative bg-[#4A2129] h-32 rounded-xl overflow-hidden">
              <img
                id="Design1"
                className="w-full h-full overflow-hidden"
                src={placeholderIMG1}
                alt="Generated Design"
              ></img>
              <button
                className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                onClick={() => handleEdit('Design1')}
              >
                Edit
              </button>
            </div>

            <div className="relative bg-[#4A2129] h-32 rounded-xl overflow-hidden">
              <img
                id="Design2"
                className="w-full h-full overflow-hidden"
                src={placeholderIMG2}
                alt="Generated Design"
              ></img>
              <button
                className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                onClick={() => handleEdit('Design2')}
              >
                Edit
              </button>
            </div>

            <div className="relative bg-[#4A2129] h-32 rounded-xl overflow-hidden">
              <img
                id="Design3"
                className="w-full h-full overflow-hidden"
                src={placeholderIMG3}
                alt="Generated Design"
              ></img>
              <button
                className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                onClick={() => handleEdit('Design3')}
              >
                Edit
              </button>
            </div>

            <div className="relative bg-[#4A2129] h-32 rounded-xl overflow-hidden">
              <img
                id="Design4"
                className="w-full h-full overflow-hidden"
                src={placeholderIMG4}
                alt="Generated Design"
              ></img>
              <button
                className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                onClick={() => handleEdit('Design4')}
              >
                Edit
              </button>
            </div>
          </div>

          {/* User Interaction Section */}
          <div className="absolute flex flex-col w-full bottom-5 gap-3">
            <div className="flex flex-row w-4/5 gap-3">
              {/* Select and Regenerate Buttons */}
              <button
                id="selectDesign"
                onClick={handleSelectDesign}
                className="bg-[#FC2B55] text-white text-center w-1/2 border-none rounded-md py-1.5 px-6 opacity-60 cursor-default"
                aria-disabled="true"
              >
                Select
              </button>

              <button className="bg-[#4A2129] text-white text-center w-1/2 border-none rounded-md py-1.5 px-6">
                Regenerate
              </button>
            </div>
            <div className="flex flex-row w-4/5 gap-3 items-center">
              {/* User Prompt box */}
              <textarea
                id="userPrompt"
                className="text-white text-sm text-left bg-[#4A2129] border-none rounded-md w-full h-24 py-1.5 px-3"
                placeholder="Enter your text here"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setInputValue(e.target.value)
                }
              />

              {/* Preview of Selected Image */}
              {isPreviewVisible && (
                <div className="w-2/5 h-2/5 flex items-center justify-center bg-opacity-75">
                  <div className="flex relative rounded-lg">
                    <button
                      className="absolute top-[-6px] right-[6px] text-gray-500 z-20 bg-white rounded-sm rotate-90"
                      onClick={handleClosePreview}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <img
                      id="previewImage"
                      src={previewImage!}
                      alt="Preview"
                      className="max-w-full max-h-full rounded-md z-10"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
