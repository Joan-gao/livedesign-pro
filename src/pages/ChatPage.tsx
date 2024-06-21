import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes} from '@fortawesome/free-solid-svg-icons';

interface Props {}

const DesignPage: React.FC<Props> = () => {
  const [inputValue, setInputValue] = useState('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const placeholderIMG = "https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/AUDbh5NsUMK82HcC6F60.jpg";

  const handleEdit = (imageId: string) => {
    const imgElement = document.getElementById(imageId) as HTMLImageElement;
    if (imgElement) {
      setPreviewImage(imgElement.src);
      setIsPreviewVisible(true);
    }
  };

  const handleClosePreview = () => {
    setIsPreviewVisible(false);
    setPreviewImage(null);
  };

  return (
    <div className="z-101 absolute top-0 h-screen w-screen grid place-items-center">
      <div className="w-375 h-667 relative top-0 flex flex-col place-items-center bg-[#240F14] rounded-25 snap-mandatory snap-y z-10">
        <div className="sticky top-0 left-0 w-full h-12 flex justify-around items-center">
          <div className="absolute w-4/5 top-0 h-12 flex items-center z-10 m-auto">
            <Link to="/FrontPage">
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

          {/* Ai Design Output */}
          <div className="grid grid-cols-2 gap-3 mt-3.5">
            <div className="relative bg-[#4A2129] h-32 rounded-xl overflow-hidden">
              <img id='Design1' className="w-full h-full overflow-hidden" src={placeholderIMG} alt='Generated Design'></img>
              <button 
                className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                onClick={() => handleEdit("Design1")}
              >
                Edit
              </button>
            </div>

            <div className="relative bg-[#4A2129] h-32 rounded-xl overflow-hidden">
              <img id='Design2' className="w-full h-full overflow-hidden" src={placeholderIMG} alt='Generated Design'></img>
              <button 
                className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                onClick={() => handleEdit("Design2")}
              >
                Edit
              </button>
            </div>

            <div className="relative bg-[#4A2129] h-32 rounded-xl overflow-hidden">
              <img id='Design3' className="w-full h-full overflow-hidden" src={placeholderIMG} alt='Generated Design'></img>
              <button 
                className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                onClick={() => handleEdit("Design3")}
              >
                Edit
              </button>
            </div>

            <div className="relative bg-[#4A2129] h-32 rounded-xl overflow-hidden">
              <img id='Design4' className="w-full h-full overflow-hidden" src={placeholderIMG} alt='Generated Design'></img>
              <button 
                className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                onClick={() => handleEdit("Design4")}
              >
                Edit
              </button>
            </div>
          </div>

          <div className="absolute flex flex-col w-full bottom-5 gap-3">
            <div className="flex flex-row w-4/5 gap-3">
              <Link
                to="/DesignPage"
                className="bg-[#FC2B55] text-white text-center w-1/2 border-none rounded-md py-1.5 px-6"
              >
                Select
              </Link>
              <button className="bg-[#4A2129] text-white text-center w-1/2 border-none rounded-md py-1.5 px-6">
                Regenerate
              </button>
            </div>
            <textarea
              className="text-white text-sm text-left bg-[#4A2129] border-none rounded-md w-4/5 h-24 py-1.5 px-3"
              placeholder="Enter your text here"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInputValue(e.target.value)
              }
            />

            {isPreviewVisible && (
              <div className="absolute bottom-4 left-0 w-1/5 h-1/5 flex items-center justify-center bg-opacity-75">
                <div className="relative rounded-lg p-4">
                  <button
                    className="absolute top-2 left-4 text-gray-500"
                    onClick={handleClosePreview}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <img src={previewImage!} alt="Preview" className="max-w-full max-h-full rounded-md" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
