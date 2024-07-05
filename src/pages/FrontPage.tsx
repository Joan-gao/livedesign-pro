import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface Props {}

const FrontPage: React.FC<Props> = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const fileName = file.name.toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'];
      const isValidFile = validExtensions.some((ext) =>
        fileName.endsWith(`.${ext}`)
      );

      if (isValidFile) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          navigate('/DesignPage', { state: { image: reader.result } });
        };
        reader.readAsDataURL(file);
      } else {
        alert(
          'Please upload a valid image file (jpg, jpeg, png, gif, bmp, tiff).'
        );
      }
    }
  };

  const openFileDialog = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click(); // Programmatically click the hidden file input
    }
  };

  const handleChooseExisting = () => {
    openFileDialog();
  };

  return (
    <div className="z-101 absolute top-0 h-screen w-screen grid place-items-center">
      <div className="w-375 h-667 relative top-0 flex flex-col place-items-center bg-[#240F14] rounded-25 snap-mandatory snap-y z-10">
        <div className="sticky top-0 left-0 w-full h-12 flex justify-around items-center">
          <div className="absolute w-4/5 top-0 h-12 flex items-center z-10 m-auto">
            <Link to="/">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-base text-white"
              />
            </Link>
          </div>
          <h2 className="text-sm font-medium text-white text-shadow px-10 py-0">
            New Event Page
          </h2>
        </div>

        <div className="flex flex-col w-4/5 gap-2">
          {/* Ai Text Responses */}
          <h2 className="text-white">How do you want to create this?</h2>
          <div className="text-white text-base text-center bg-[#4A2129] border-none rounded-xl h-fit px-3 py-3">
            <button className="cursor-pointer" onClick={handleChooseExisting}>
              Choose Existing
            </button>

            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }} // Hide the default file input style
              ref={(fileInput) => {
                if (fileInput) {
                  fileInput.setAttribute('multiple', ''); // Allow multiple file selection if needed
                }
              }}
            />
          </div>
          <div className="text-white text-base text-center bg-[#4A2129] border-none rounded-xl h-fit px-3 py-3 margin-auto">
            <Link to="/GenerationPage">
              <p className="text-white text-center">Choose Generate</p>
            </Link>

          </div>
          <div className='bg-[#4A2129] px-3 py-3 opacity-80'>
            <p className='text-[rgba(0,0,0,1)] text-left'>
              <strong>Important Notes:</strong> <br></br>
              Due to the high pricing of the Mid Journey API, we have limited each IP addresses to only 2 times generation of images for the trialling of the app feature.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
